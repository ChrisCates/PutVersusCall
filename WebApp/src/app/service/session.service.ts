import { Injectable } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

import * as superagent from 'superagent';
import { environment as env } from '../../environments/environment';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public socket = io(`${env.api}`);
  public rooms = [];

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

  constructor(private router: Router) {
    this.get();

    this.router.events.subscribe(async event => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot.routeConfig.path === '') {
          this.joinRoom('home');
        } else {
          this.leaveRoom('home');
        }

        if (event.snapshot.routeConfig.path === 'ticker/:symbol') {
          this.joinRoom('symbol', event.snapshot.params.symbol);
        } else {
          this.leaveRoom('symbol', event.snapshot.params.symbol);
        }

        if (event.snapshot.routeConfig.path === 'spread/:symbol/:spread_id') {
          this.joinRoom('spread', event.snapshot.params.spread_id);
        } else {
          this.leaveRoom('spread', event.snapshot.params.spread_id);
        }
      }
    });
  }

  private joinRoom(room, id = '') {
    this.socket.emit(room, { action: 'join', id });
    this.rooms.push({ room, id });
  }

  public leaveRoom(room, id = '') {
    this.socket.emit(room, { action: 'leave', id });
    this.rooms = this.rooms.filter(_room => _room.room !== room && _room.id !== id);
  }

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
