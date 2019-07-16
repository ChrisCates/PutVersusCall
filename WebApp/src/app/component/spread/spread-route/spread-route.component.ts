import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../service/session.service';
import { SpreadService } from '../spread.service';

import * as moment from 'moment';

@Component({
  selector: 'app-spread-route',
  templateUrl: './spread-route.component.html',
  styleUrls: ['./spread-route.component.scss']
})
export class SpreadRouteComponent implements OnInit {

  public moment = moment;

  constructor(public spread: SpreadService, public session: SessionService) { }

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

}
