import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { TickerService } from '../ticker.service';

@Component({
  selector: 'app-ticker-spread',
  templateUrl: './ticker-spread.component.html',
  styleUrls: ['./ticker-spread.component.scss']
})
export class TickerSpreadComponent implements OnInit {

  /**
   * Option values:
   * 1. create
   * 2. spreads
   * 3. recent
  */
  public tab = 'recent';

  constructor(public session: SessionService, public ticker: TickerService) { }

  ngOnInit() {

  }

}
