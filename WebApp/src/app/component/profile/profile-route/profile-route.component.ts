import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../service/session.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss']
})
export class ProfileRouteComponent implements OnInit {

  constructor(public session: SessionService, public profile: ProfileService) { }

  public async ngOnInit() {
    await this.session.get();
    this.profile.original = Object.assign({}, this.session.data);
    this.profile.data = Object.assign({}, this.session.data);

    const el: any = document.querySelector('input#photo-input');

    el.onchange = async () => {
      try {
        const file = el.files[0];
        this.profile.file = file;

        if (FileReader && file) {
          const Reader = new FileReader();
          Reader.onload = () => {
            document.querySelector('a.profile-photo img')['src'] = Reader.result;
          };
          Reader.readAsDataURL(file);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  public click() {
    const el: any = document.querySelector('input#photo-input');
    el.click();
  }

}
