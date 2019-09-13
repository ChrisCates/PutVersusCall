import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../../service/session.service';
import { SpreadService } from '../spread.service';

import * as moment from 'moment';
import * as superagent from 'superagent';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-spread-route',
  templateUrl: './spread-route.component.html',
  styleUrls: ['./spread-route.component.scss']
})
export class SpreadRouteComponent implements OnInit {

  public moment = moment;
  public options = false;
  public edit = false;

  public editedDescription = '';

  constructor(private router: Router, public spread: SpreadService, public session: SessionService) { }

  ngOnInit() {

  }

  public amount(strike, type = 'call') {
    if (strike.data[type]) {
      return strike.data[type].amount;
    } else {
      return 0;
    }
  }

  public position(strike, type = 'call') {
    if (strike.data[type]) {
      return strike.data[type].position.toUpperCase();
    } else {
      return '-';
    }
  }

  public getExpiry(strike, type) {
    if (strike.data[type]) {
      return strike.data[type].expiry;
    } else {
      return 'N/A';
    }
  }

  public async updateSpread(spread) {
    try {
      await superagent
        .patch(`${env.api}/spread`)
        .send({ _id: spread._id, description: this.editedDescription, })
        .withCredentials();
      this.spread.spread.description = this.editedDescription;
      this.edit = false;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteSpread(spread) {
    try {
      await superagent
        .delete(`${env.api}/spread?_id=${spread._id}`)
        .withCredentials();

      this.router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }

  public async updateMessage(message) {
    try {
      await superagent
        .patch(`${env.api}/spread/chat`)
        .send({ _id: message._id, message: message.editedMessage, })
        .withCredentials();
      message.message = message.editedMessage;
      message.edit = false;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteMessage(message, index) {
    try {
      await superagent.delete(`${env.api}/spread/chat?_id=${message._id}`).withCredentials();
      this.spread.messages.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  }

}
