import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { TickerService } from '../ticker.service';

import * as moment from 'moment';

import * as superagent from 'superagent';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-ticker-spread-publish',
  templateUrl: './ticker-spread-publish.component.html',
  styleUrls: ['./ticker-spread-publish.component.scss']
})
export class TickerSpreadPublishComponent implements OnInit {

  public select = {
    one: false,
  };

  public moment = moment;

  public form: any = {
    symbol: '',
    expiry: '',
    title: '',
    description: '',
    data: {},
  };

  public state = {
    form: {
      loading: false,
      error: false,
      message: '',
    },
  };

  constructor(public session: SessionService, public ticker: TickerService) { }

  ngOnInit() {
    this.form.symbol = this.ticker.symbol;
    this.form.expiry = this.ticker.activeExpiry;
  }

  public update(strike, type, position) {
    if (!this.form.data[strike]) {
      this.form.data[strike] = {};
    }
    if (!this.form.data[strike][type]) {
      this.form.data[strike][type] = {};
    }

    this.form.data[strike][type].position = position;
  }

  public updateAmount($event, strike, type) {
    if (!this.form.data[strike]) {
      this.form.data[strike] = {};
    }
    if (!this.form.data[strike][type]) {
      this.form.data[strike][type] = {};
    }

    this.form.data[strike][type].amount = $event.target.value;
  }

  public isActive(strike, type, position) {
    if (this.form.data[strike]) {
      if (this.form.data[strike][type]) {
        if (this.form.data[strike][type].position === position) {
          return true;
        }
      }
    }
    return false;
  }

  public async submit() {
    if (this.state.form.loading) { return; }
    if (this.form.data === {}) { return; }
    if (this.form.title === '') { return; }

    this.state.form.loading = true;
    this.state.form.error = false;
    this.state.form.message = '';

    try {
      await superagent
        .post(`${env.api}/spread`)
        .send(this.form)
        .withCredentials();

      this.reset();
    } catch (error) {
      this.state.form.error = true;
      if (error.response) {
        this.state.form.message = error.response.message;
      } else {
        this.state.form.message = 'Could not publish spread';
      }
    }

    this.state.form.loading = false;
  }

  public reset() {
    this.form = {
      symbol: '',
      expiry: '',
      title: '',
      description: '',
      data: {},
    };
  }

}
