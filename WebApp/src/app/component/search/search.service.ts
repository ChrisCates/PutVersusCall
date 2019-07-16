import { Injectable } from '@angular/core';

import * as superagent from 'superagent';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public result = {
    ask: 0,
    ask_date: 0,
    askexch: '',
    asksize: 0,
    average_volume: 0,
    bid: 0,
    bid_date: 0,
    bidexch: '',
    bidsize: 0,
    change: 0,
    change_percentage: 0,
    close: null,
    description: '',
    exch: '',
    high: null,
    last: 0,
    last_volume: 0,
    low: null,
    open: null,
    prevclose: 0,
    root_symbols: '',
    symbol: '',
    trade_date: 0,
    type: '',
    volume: 0,
    week_52_high: 0,
    week_52_low: 0,
  };

  public symbolInput = '';

  public state = {
    search: {
      state: 0,
      loading: false,
      message: '',
      timeout: null,
    },
  };

  constructor() { }

  public async get() {
    if (this.state.search.loading) {
      return;
    }

    this.state.search.loading = true;
    this.state.search.state = 0;
    this.state.search.message = '';

    try {
      this.reset();
      const payload = await superagent.get(`${env.api}/tradier/quote?symbol=${this.symbolInput}`).withCredentials();
      this.state.search.state = 1;
      this.state.search.message = '';
      this.result = payload.body.response.quote;
    } catch (error) {
      if (error.response) {
        this.state.search.state = -1;
        this.state.search.message = error.response.body.message;
      } else {
        this.state.search.state = -1;
        this.state.search.message = 'Could not retrieve results';
      }
      clearTimeout(this.state.search.timeout);
      this.state.search.timeout = setTimeout(() => {
        this.state.search.state = 0;
        this.state.search.message = '';
      }, 2500);
    }
    this.state.search.loading = false;
  }

  public reset() {
    this.result = {
      ask: 0,
      ask_date: 0,
      askexch: '',
      asksize: 0,
      average_volume: 0,
      bid: 0,
      bid_date: 0,
      bidexch: '',
      bidsize: 0,
      change: 0,
      change_percentage: 0,
      close: null,
      description: '',
      exch: '',
      high: null,
      last: 0,
      last_volume: 0,
      low: null,
      open: null,
      prevclose: 0,
      root_symbols: '',
      symbol: '',
      trade_date: 0,
      type: '',
      volume: 0,
      week_52_high: 0,
      week_52_low: 0,
    };
  }

}
