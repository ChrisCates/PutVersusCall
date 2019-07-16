import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../service/session.service';
import { IndexService } from '../index.service';

@Component({
  selector: 'app-index-form',
  templateUrl: './index-form.component.html',
  styleUrls: ['./index-form.component.scss']
})
export class IndexFormComponent implements OnInit {

  constructor(public session: SessionService, public index: IndexService) { }

  ngOnInit() {
    this.session.get();
  }

}
