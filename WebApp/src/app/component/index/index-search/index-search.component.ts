import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { IndexService } from '../index.service';

import * as moment from 'moment';

@Component({
  selector: 'app-index-search',
  templateUrl: './index-search.component.html',
  styleUrls: ['./index-search.component.scss']
})
export class IndexSearchComponent implements OnInit {

  public moment = moment;

  // Tab options: votes, spreads, comments
  public tab = 'votes';

  constructor(public session: SessionService, public index: IndexService) { }

  ngOnInit() {
    this.index.recentStrikes();
    this.index.recentSpreads();
    this.index.recentChats();
  }

}
