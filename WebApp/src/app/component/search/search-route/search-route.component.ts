import { Component, OnInit } from '@angular/core';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.scss']
})
export class SearchRouteComponent implements OnInit {

  constructor(public search: SearchService) { }

  ngOnInit() {

  }

}
