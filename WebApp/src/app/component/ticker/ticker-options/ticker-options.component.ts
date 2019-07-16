import { Component, OnInit } from '@angular/core';
import { TickerService } from '../ticker.service';

@Component({
  selector: 'app-ticker-options',
  templateUrl: './ticker-options.component.html',
  styleUrls: ['./ticker-options.component.scss']
})
export class TickerOptionsComponent implements OnInit {

  public selectToggle = false;

  constructor(public ticker: TickerService) { }

  ngOnInit() { }

}
