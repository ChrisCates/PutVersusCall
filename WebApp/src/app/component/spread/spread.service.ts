import { Injectable } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

import * as superagent from 'superagent';
import { environment as env } from '../../../environments/environment';

import { SearchService } from '../search/search.service';

@Injectable({
  providedIn: 'root'
})
export class SpreadService {

  public id = '';
  public symbol = '';

  public spread = {
    user: {
      _id: '',
      username: '',
      tagline: '',
      photo: '',
    },
    symbol: '',
    expiry: '',
    title: '',
    description: '',
    data: null,
    dateCreated: 0,
    dateUpdated: 0
  };

  public strikes = [];

  public messageInput = '';
  public messages = [];

  public state = {
    get: {
      loading: false,
      error: false,
      message: '',
    },
    message: {
      loading: false,
      error: false,
      message: '',
    },
    messageForm: {
      loading: false,
      error: false,
      message: '',
    },
  };

  constructor(private router: Router, private search: SearchService) {
    this.router.events.subscribe(async event => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot.routeConfig.path === 'spread/:symbol/:spread_id') {
          if (event.snapshot.params.symbol) {
            this.search.symbolInput = event.snapshot.params.symbol;
            this.symbol = this.search.symbolInput;
            await this.search.get();
            this.id = event.snapshot.params.spread_id;
            this.get();
            this.getMessages();
          } else {
            this.router.navigateByUrl('/search');
          }
        }
      }
    });
  }

  public async get() {
    if (this.state.get.loading) { return; }
    this.state.get.loading = true;
    this.state.get.error = false;
    this.state.get.message = '';

    try {
      const payload = await superagent.get(`${env.api}/spread/id/${this.id}`).withCredentials();
      this.spread = payload.body.response;
      this.strikes = [];

      if (this.spread.data) {
        Object.keys(this.spread.data).reverse().forEach(key => {
          this.strikes.push({
            strike: key,
            data: this.spread.data[key],
          });
        });
      }
    } catch (error) {
      this.state.get.error = true;
      if (error.response) {
        this.state.get.message = error.response.message;
      } else {
        this.state.get.message = 'Could not get spread';
      }
    }

    this.state.get.loading = false;
  }

  public async submitMessage() {
    if (this.state.messageForm.loading && this.messageInput.length === 0) { return; }
    this.state.messageForm.loading = true;
    this.state.messageForm.error = false;
    this.state.messageForm.message = '';
    try {
      const payload = await superagent
        .post(`${env.api}/spread/chat`)
        .send({ spread: this.id, message: this.messageInput })
        .withCredentials();

      this.messageInput = '';
    } catch (error) {
      this.state.messageForm.error = true;
      if (error.response) {
        this.state.messageForm.message = error.response.message;
      } else {
        this.state.messageForm.message = 'Could not submit spread message';
      }
    }

    this.state.messageForm.loading = false;
  }

  public async getMessages() {
    if (this.state.message.loading) { return; }
    this.state.message.loading = true;
    this.state.message.error = false;
    this.state.message.message = '';
    try {
      const payload = await superagent
        .get(`${env.api}/spread/chat?spread=${this.id}`)
        .withCredentials();

      this.messages = payload.body.response;
      console.log(this.messages);
    } catch (error) {
      this.state.message.error = true;
      if (error.response) {
        this.state.message.message = error.response.message;
      } else {
        this.state.message.message = 'Could not get spread messages';
      }
    }

    this.state.message.loading = false;
  }

}
