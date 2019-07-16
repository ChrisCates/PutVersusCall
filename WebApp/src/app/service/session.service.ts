import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as superagent from 'superagent';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public active = false;

  public data = {
    _id: '',
    name: '',
    email: '',
    username: '',
    tagline: '',
    photo: '',
  };

  public state = {
    session: {
      state: 0,
      loading: false,
      message: '',
    },
  };

  constructor(private router: Router) { }

  public photoUrl(url = null) {
    if (url) {
      return `${env.api}/${url}`;
    } else {
      return `/assets/placeholder.photo.png`;
    }
  }

  public async get(forceReset = false) {
    if (this.active === true && forceReset === false) {
      this.reset();
      return;
    }

    this.state.session.loading = true;

    try {
      const payload = await superagent.get(`${env.api}/session`).withCredentials();
      this.data = payload.body.user;
      this.active = payload.body.active;
      this.reset();

      if (this.active === false) {
        this.router.navigateByUrl('/');
      }
    } catch (error) {
      if (error.response) {
        this.state.session.state = -1;
        this.state.session.message = error.response.body.message;
      } else {
        this.state.session.state = -1;
        this.state.session.message = 'There was an issue registering';
      }
    }
    this.state.session.loading = false;
  }

  public async logout() {
    this.state.session.loading = true;

    try {
      const payload = await superagent.get(`${env.api}/logout`).withCredentials();
      this.resetSession();
      this.router.navigateByUrl('/');
    } catch (error) {
      if (error.response) {
        this.state.session.state = -1;
        this.state.session.message = error.response.body.message;
      } else {
        this.state.session.state = -1;
        this.state.session.message = 'There was an issue registering';
      }
    }
    this.state.session.loading = false;
  }

  public reset() {
    this.state = {
      session: {
        state: 0,
        loading: false,
        message: '',
      },
    };
  }

  public resetSession() {
    this.active = false;
    this.data = {
      _id: '',
      name: '',
      email: '',
      username: '',
      tagline: '',
      photo: '',
    };
  }

}
