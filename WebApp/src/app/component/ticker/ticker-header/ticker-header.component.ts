import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-ticker-header',
  templateUrl: './ticker-header.component.html',
  styleUrls: ['./ticker-header.component.scss']
})
export class TickerHeaderComponent implements OnInit {

  constructor(public search: SearchService) { }

  ngOnInit() {

  }

}
