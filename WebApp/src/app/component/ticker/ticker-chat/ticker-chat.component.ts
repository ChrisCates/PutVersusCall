import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../service/session.service';
import { TickerService } from '../ticker.service';

import * as moment from 'moment';

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

  public setSentiment(sentiment = '') {
    if (this.ticker.chatForm.sentiment === sentiment) {
      this.ticker.chatForm.sentiment = '';
    } else {
      this.ticker.chatForm.sentiment = sentiment;
    }
  }

}
