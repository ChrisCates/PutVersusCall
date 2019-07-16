import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationService } from '../../service/validation.service';

import * as superagent from 'superagent';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  public popup = false;
  public tab = false;

  public state = {
    username: {
      state: 0,
      loading: false,
      message: '',
    },
    password: {
      state: 0,
      loading: false,
      message: '',
    },
    confirmPassword: {
      state: 0,
      loading: false,
      message: '',
    },
    submit: {
      state: 0,
      loading: false,
      message: '',
    },
    strike: {
      state: 0,
      loading: false,
      message: '',
    },
    spread: {
      state: 0,
      loading: false,
      message: '',
    },
    chat: {
      state: 0,
      loading: false,
      message: '',
    },
  };

  public form = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  public strikes = [];
  public spreads = [];
  public chats = [];

  constructor(private router: Router, public validation: ValidationService) {

  }

  public async recentChats() {
    if (this.state.chat.loading) {
      return;
    }

    this.state.chat.loading = true;
    this.state.chat.state = 0;
    this.state.chat.message = '';

    try {
      const payload = await superagent
        .get(`${env.api}/chat`)
        .withCredentials();

      this.chats = payload.body.response;

      this.state.chat.state = 1;
      this.state.chat.message = '';
    } catch (error) {
      if (error.response) {
        this.state.chat.state = -1;
        this.state.chat.message = error.response.body.message;
      } else {
        this.state.chat.state = -1;
        this.state.chat.message = 'Could not get chats';
      }
    }
    this.state.chat.loading = false;
  }


  public async recentSpreads() {
    if (this.state.spread.loading) {
      return;
    }

    this.state.spread.loading = true;
    this.state.spread.state = 0;
    this.state.spread.message = '';

    try {
      const payload = await superagent
        .get(`${env.api}/spread/recent`)
        .withCredentials();

      this.spreads = payload.body.response;

      this.state.spread.state = 1;
      this.state.spread.message = '';
    } catch (error) {
      if (error.response) {
        this.state.spread.state = -1;
        this.state.spread.message = error.response.body.message;
      } else {
        this.state.spread.state = -1;
        this.state.spread.message = 'Could not get spreads';
      }
    }
    this.state.spread.loading = false;
  }

  public async recentStrikes() {
    if (this.state.strike.loading) {
      return;
    }

    this.state.strike.loading = true;
    this.state.strike.state = 0;
    this.state.strike.message = '';

    try {
      const payload = await superagent
        .get(`${env.api}/strike/recent`)
        .withCredentials();

      this.strikes = payload.body.response;

      this.state.strike.state = 1;
      this.state.strike.message = '';
    } catch (error) {
      if (error.response) {
        this.state.strike.state = -1;
        this.state.strike.message = error.response.body.message;
      } else {
        this.state.strike.state = -1;
        this.state.strike.message = 'Could not get strikes';
      }
    }
    this.state.strike.loading = false;
  }

  public async validate(key) {
    if (this.tab) {
      this.reset();
      return;
    }

    try {
      this.state[key].loading = true;
      let state: any = { state: 0, message: '' };
      if (key === 'username') {
        state = await this.validation.validateUsername(this.form[key]);
      } else if (key === 'password') {
        state = await this.validation.validatePassword(this.form[key]);
      } else if (key === 'confirmPassword') {
        if (this.form.password === this.form.confirmPassword) {
          state.state = 1;
          state.message = 'This password matches';
        } else {
          state.state = -1;
          state.message = 'This password does not match';
        }
      }
      this.state[key].state = state.state;
      this.state[key].message = state.message;
    } catch (error) {
      this.state[key].state = -1;
      this.state[key].message = 'Error validating ' + key;
    }
    this.state[key].loading = false;
  }

  public submit() {
    if (this.tab) {
      this.login();
    } else {
      if (this.state.username.state === 1 && this.state.password.state === 1 && this.state.confirmPassword.state === 1) {
        this.register();
      }
    }
  }

  public async register() {
    this.state.submit.loading = true;
    try {
      const payload = await superagent.post(`${env.api}/register`).send(this.form).withCredentials();
      this.reset();
      this.router.navigateByUrl('/profile');
    } catch (error) {
      if (error.response) {
        this.state.submit.state = -1;
        this.state.submit.message = error.response.body.message;
      } else {
        this.state.submit.state = -1;
        this.state.submit.message = 'There was an issue registering';
      }
    }
    this.state.submit.loading = false;
  }

  public async login() {
    this.state.submit.loading = true;
    try {
      const payload = await superagent.post(`${env.api}/login`).send(this.form).withCredentials();
      this.reset();
      this.router.navigateByUrl('/profile');
    } catch (error) {
      if (error.response) {
        this.state.submit.state = -1;
        this.state.submit.message = error.response.body.message;
      } else {
        this.state.submit.state = -1;
        this.state.submit.message = 'There was an issue logging in';
      }
    }
    this.state.submit.loading = false;
  }

  public reset() {
    this.state = {
      username: {
        state: 0,
        loading: false,
        message: '',
      },
      password: {
        state: 0,
        loading: false,
        message: '',
      },
      confirmPassword: {
        state: 0,
        loading: false,
        message: '',
      },
      submit: {
        state: 0,
        loading: false,
        message: '',
      },
      strike: {
        state: 0,
        loading: false,
        message: '',
      },
    };
  }

}
