import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { TickerService } from '../ticker.service';

import * as moment from 'moment';

import * as superagent from 'superagent';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-ticker-spread-created',
  templateUrl: './ticker-spread-created.component.html',
  styleUrls: ['./ticker-spread-created.component.scss']
})
export class TickerSpreadCreatedComponent implements OnInit {

  public moment = moment;

  public spreads = [];

  public state = {
    get: {
      loading: false,
      error: false,
      message: '',
    },
  };

  constructor(public session: SessionService, public ticker: TickerService) { }

  ngOnInit() {
    this.get();
  }

  public async get() {
    if (this.state.get.loading) { return; }
    this.state.get.loading = true;
    this.state.get.error = false;
    this.state.get.message = '';

    try {
      const payload = await superagent.get(`${env.api}/spread?symbol=${this.ticker.symbol}`).withCredentials();
      this.spreads = payload.body.response;
      console.log('Spreads', this.spreads);
    } catch (error) {
      this.state.get.error = true;
      if (error.response) {
        this.state.get.message = error.response.message;
      } else {
        this.state.get.message = 'Could not publish spread';
      }
    }

    this.state.get.loading = true;
  }

}
