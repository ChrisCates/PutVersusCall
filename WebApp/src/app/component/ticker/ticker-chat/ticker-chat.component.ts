import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../service/session.service';
import { TickerService } from '../ticker.service';

import * as moment from 'moment';
import * as superagent from 'superagent';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-ticker-chat',
  templateUrl: './ticker-chat.component.html',
  styleUrls: ['./ticker-chat.component.scss']
})
export class TickerChatComponent implements OnInit {

  public select = {
    one: false,
    two: false,
    three: false,
  };

  public moment = moment;

  constructor(public session: SessionService, public ticker: TickerService) { }

  ngOnInit() { }

  public async updateMessage(message) {
    try {
      await superagent
        .patch(`${env.api}/chat`)
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
      await superagent.delete(`${env.api}/chat?_id=${message._id}`).withCredentials();
      this.ticker.chat.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  }

}
