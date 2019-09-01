import { Component, OnInit } from '@angular/core';

import { IndexService } from '../index.service';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-index-route',
  templateUrl: './index-route.component.html',
  styleUrls: ['./index-route.component.scss']
})
export class IndexRouteComponent implements OnInit {

  constructor(public session: SessionService, public index: IndexService) { }

  ngOnInit() { }

}
