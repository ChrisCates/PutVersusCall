import { Component, OnInit } from '@angular/core';
import { TickerService } from '../ticker.service';

@Component({
  selector: 'app-ticker-route',
  templateUrl: './ticker-route.component.html',
  styleUrls: ['./ticker-route.component.scss']
})
export class TickerRouteComponent implements OnInit {

  constructor(public ticker: TickerService) { }

  ngOnInit() { }

}
