import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public toggle = false;

  constructor(public session: SessionService) { }

  ngOnInit() { }

}
