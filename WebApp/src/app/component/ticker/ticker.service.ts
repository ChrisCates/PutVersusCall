import { Injectable } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

import { SearchService } from '../search/search.service';

import * as superagent from 'superagent';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  /**
   * Option values:
   * 1. conversation
   * 2. spreads
   * 3. options
  */
  public tab = 'conversation';

  public symbol = '';

  public chatForm = {
    message: '',
    strategy: '',
    sentiment: '',
    expiry: '',
  };
  public chat = [];

  public options = {
    itm: 4,
    expiry: [],
    strike: [],
    itmStrikes: [],
  };

  public strikeSort = 'ascending';
  public strikes = [];

  public strikerPopup = false;
  public activeStrike = 0;
  public activeSentiment = '';
  public filteredStrikers = [];

  public activeExpiry = '';
  public expirySort = 'ascending';

  public state = {
    option: {
      state: 0,
      loading: false,
      message: '',
      timeout: null,
    },
    chat: {
      state: 0,
      loading: false,
      message: '',
      timeout: null,
    },
    submitChat: {
      state: 0,
      loading: false,
      message: '',
      timeout: null,
    },
    strike: {
      state: 0,
      loading: false,
      message: '',
      timeout: null,
    },
    submitStrike: {
      state: 0,
      loading: false,
      message: '',
      timeout: null,
    }
  };

  constructor(private router: Router, private search: SearchService) {
    this.router.events.subscribe(async event => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot.routeConfig.path === 'ticker/:symbol') {
          if (event.snapshot.params.symbol) {
            this.search.symbolInput = event.snapshot.params.symbol;
            this.symbol = this.search.symbolInput;
            await this.search.get();
            await this.getOptions();
            await this.getChat();
          } else {
            this.router.navigateByUrl('/search');
          }
        }
      }
    });
  }

  public async getOptions() {
    if (this.state.option.loading) {
      return;
    }

    this.state.option.loading = true;
    this.state.option.state = 0;
    this.state.option.message = '';

    try {
      const payload = await superagent
        .get(`${env.api}/tradier/options?symbol=${this.symbol}&expiry=${this.activeExpiry}`)
        .withCredentials();

      this.state.option.state = 1;
      this.state.option.message = '';
      this.options.expiry = payload.body.response.expiry.date;
      this.options.strike = payload.body.response.strike.strike;

      if (!this.activeExpiry) {
        this.activeExpiry = this.options.expiry[0];
      }

      await this.getStrikes();
    } catch (error) {
      if (error.response) {
        this.state.option.state = -1;
        this.state.option.message = error.response.body.message;
      } else {
        this.state.option.state = -1;
        this.state.option.message = 'Could not retrieve results';
      }
    }
    this.state.option.loading = false;
  }

  public async getChat() {
    if (this.state.chat.loading) {
      return;
    }

    this.state.chat.loading = true;
    this.state.chat.state = 0;
    this.state.chat.message = '';

    try {
      const payload = await superagent
        .get(`${env.api}/chat?symbol=${this.symbol}`)
        .withCredentials();

      this.chat = payload.body.response;

      this.state.chat.state = 1;
      this.state.chat.message = '';
    } catch (error) {
      if (error.response) {
        this.state.chat.state = -1;
        this.state.chat.message = error.response.body.message;
      } else {
        this.state.chat.state = -1;
        this.state.chat.message = 'Could not get messages';
      }
    }
    this.state.chat.loading = false;
  }

  public async submitChat() {
    if (this.state.submitChat.loading && this.chatForm.message.length === 0) {
      return;
    }

    this.state.submitChat.loading = true;
    this.state.submitChat.state = 0;
    this.state.submitChat.message = '';

    try {
      const payload = await superagent
        .post(`${env.api}/chat`)
        .send({
          symbol: this.symbol,
          message: this.chatForm.message,
          sentiment: this.chatForm.sentiment,
          strategy: this.chatForm.strategy,
          expiry: this.chatForm.expiry,
        })
        .withCredentials();

      this.chatForm.message = '';

      this.state.submitChat.state = 1;
      this.state.submitChat.message = '';

      this.getChat();
    } catch (error) {
      if (error.response) {
        this.state.submitChat.state = -1;
        this.state.submitChat.message = error.response.body.message;
      } else {
        this.state.submitChat.state = -1;
        this.state.submitChat.message = 'Could not submit message';
      }
    }
    this.state.submitChat.loading = false;
  }

  public async getStrikes() {
    if (this.state.strike.loading) {
      return;
    }

    this.state.strike.loading = true;
    this.state.strike.state = 0;
    this.state.strike.message = '';

    try {
      const payload = await superagent
        .get(`${env.api}/strike?symbol=${this.symbol}&expiry=${this.activeExpiry}`)
        .withCredentials();

      this.strikes = payload.body.response;
      this.sortStrikes(false);

      this.state.strike.state = 1;
      this.state.strike.message = '';
    } catch (error) {
      if (error.response) {
        this.state.strike.state = -1;
        this.state.strike.message = error.response.body.message;
      } else {
        this.state.strike.state = -1;
        this.state.strike.message = 'Could not get strikes';
      }
    }
    this.state.strike.loading = false;
  }

  public sortStrikes(reorder = false) {
    if (reorder) {
      this.strikeSort === 'ascending' ? this.strikeSort = 'descending' : this.strikeSort = 'ascending';
    }
    this.options.strike.sort((a, b) => {
      if (a > b) {
        return this.strikeSort === 'ascending' ? -1 : 1;
      } else if (a < b) {
        return this.strikeSort === 'ascending' ? 1 : -1;
      } else {
        return 0;
      }
    });

    const price = this.search.result.last;

    let itm = 0;
    let itmIndex = 0;

    for (let i = 1; i < this.options.strike.length - 1; i++) {
      const strike1 = this.options.strike[i - 1];
      const strike2 = this.options.strike[i];
      const strike3 = this.options.strike[i + 1];

      if (price < strike1 && price > strike3) {
        itm = strike2;
        itmIndex = i;
      }
    }

    this.options.itmStrikes = [];

    if (itmIndex !== 0 && this.options.itm !== -1) {
      for (let i = itmIndex; i > itmIndex - this.options.itm; i--) {
        if (this.options.strike[i]) {
          const strike = this.options.strike[i];
          this.options.itmStrikes.unshift(strike);
        }
      }

      for (let i = itmIndex + 1; i < itmIndex + this.options.itm; i++) {
        if (this.options.strike[i]) {
          const strike = this.options.strike[i];
          this.options.itmStrikes.push(strike);
        }
      }
    } else if (this.options.itm === -1) {
      this.options.itmStrikes = this.options.strike;
    }
  }

  public strikeFilter(strike = null, sentiment = 'call') {
    if (!strike) { return []; }
    return this.strikes.filter(_strike => {
      return (_strike.strike === strike && _strike.sentiment === sentiment);
    });
  }

  public strikeSentiment(strike = null) {
    if (!strike) { return 'Neutral'; }
    if (this.strikeFilter(strike, 'call').length > this.strikeFilter(strike, 'put').length) {
      return 'Bullish';
    } if (this.strikeFilter(strike, 'call').length < this.strikeFilter(strike, 'put').length) {
      return 'Bearish';
    } else {
      return 'Neutral';
    }
  }

  public strikeTotal(sentiment = 'call') {
    let total = 0;
    this.strikes.forEach(strike => {
      if (strike.sentiment === sentiment) {
        total++;
      }
    });
    return total;
  }

  public sentimentAverage(sentiment = 'call') {
    let total = 0;
    let amount = 0;
    this.strikes.forEach(strike => {
      if (strike.sentiment === sentiment) {
        total += strike.strike;
        amount++;
      }
    });
    return total ? (total / amount) : 0;
  }

  public overallSentiment() {
    let totalCalls = 0;
    let totalPuts = 0;
    this.strikes.forEach(strike => {
      if (strike.sentiment === 'call') {
        totalCalls++;
      } else {
        totalPuts++;
      }
    });

    if (totalCalls > totalPuts) {
      return 'Bullish';
    } else if (totalCalls < totalPuts) {
      return 'Bearish';
    } else {
      return 'Neutral';
    }
  }

  public openStriker(strike = null, sentiment = 'call') {
    if (!strike) { return []; }
    this.filteredStrikers = this.strikes.filter(_strike => {
      return (_strike.strike === strike && _strike.sentiment === sentiment);
    });
    this.activeStrike = strike;
    this.activeSentiment = sentiment;
    this.strikerPopup = true;
  }

  public async submitStrike(strike = null, sentiment = 'call') {
    if (this.state.submitStrike.loading && !strike) {
      return;
    }

    this.state.submitStrike.loading = true;
    this.state.submitStrike.state = 0;
    this.state.submitStrike.message = '';

    try {
      const payload = await superagent
        .post(`${env.api}/strike`)
        .send({
          symbol: this.symbol,
          expiry: this.activeExpiry,
          strike,
          sentiment,
        })
        .withCredentials();

      this.state.submitStrike.state = 1;
      this.state.submitStrike.message = '';

      this.getStrikes();
    } catch (error) {
      if (error.response) {
        this.state.submitStrike.state = -1;
        this.state.submitStrike.message = error.response.body.message;
      } else {
        this.state.submitStrike.state = -1;
        this.state.submitStrike.message = 'Could not submit strike';
      }
    }
    this.state.submitStrike.loading = false;
  }

  public isActiveStrike(strike, type = 'call') {
    let active = false;
    this.strikes.forEach(_strike => {
      if (_strike.strike === strike && _strike.sentiment === type) {
        active = true;
      }
    });
    return active;
  }

  public updateExpiry(expiry) {
    this.activeExpiry = expiry;
    this.getOptions();
  }

}
