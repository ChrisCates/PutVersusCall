import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { TickerService } from '../ticker.service';

import * as moment from 'moment';

@Component({
  selector: 'app-ticker-strikes',
  templateUrl: './ticker-strikes.component.html',
  styleUrls: ['./ticker-strikes.component.scss']
})
export class TickerStrikesComponent implements OnInit {

  public select = {
    one: false,
  };

  public moment = moment;

  constructor(public session: SessionService, public ticker: TickerService) { }

  ngOnInit() { }

}
