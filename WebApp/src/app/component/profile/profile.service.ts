import { Injectable } from '@angular/core';

import { SessionService } from '../../service/session.service';
import { ValidationService } from '../../service/validation.service';

import * as superagent from 'superagent';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public original = {
    _id: '',
    name: '',
    email: '',
    username: '',
    tagline: '',
    photo: '',
  };

  public data = {
    _id: '',
    name: '',
    email: '',
    username: '',
    tagline: '',
    photo: '',
  };

  public file = null;

  public resetPassword = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  public state = {
    submit: {
      state: 0,
      loading: false,
      message: '',
    },
    username: {
      state: 0,
      loading: false,
      message: '',
    },
    email: {
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
    reset: {
      state: 0,
      loading: false,
      message: '',
    },
  };

  constructor(private session: SessionService, private validation: ValidationService) { }

  public async validate(key) {
    try {
      if (this.data[key] === this.original[key]) {
        this.state[key].loading = false;
        this.state[key].state = 0;
        this.state[key].message = '';
        return;
      }

      this.state[key].loading = true;
      let state: any = { state: 0, message: '' };

      if (key === 'username') {
        state = await this.validation.validateUsername(this.data[key]);
      } else if (key === 'email') {
        state = await this.validation.validateEmail(this.data[key]);
      }
      this.state[key].state = state.state;
      this.state[key].message = state.message;
    } catch (error) {
      this.state[key].state = -1;
      this.state[key].message = 'Error validating ' + key;
    }
    this.state[key].loading = false;

  }

  public async validatePassword(key) {
    try {
      this.state[key].loading = true;
      let state: any = { state: 0, message: '' };
      if (key === 'password') {
        state = await this.validation.validatePassword(this.resetPassword[key]);
      } else if (key === 'confirmPassword') {
        if (this.resetPassword.password === this.resetPassword.confirmPassword) {
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

  public async submit() {
    if (this.state.email.state === -1 && this.state.username.state === -1) { return; }
    this.state.submit.loading = true;
    try {
      const request = superagent.post(`${env.api}/user`);

      request.field('name', this.data.name);
      request.field('username', this.data.username);
      request.field('email', this.data.email);
      request.field('tagline', this.data.tagline);

      if (this.file) {
        request.attach('photo', this.file);
      }

      await request.withCredentials();

      if (this.file) {
        this.file = null;
      }

      this.state.submit.state = 0;
      this.state.submit.message = '';
      this.original = Object.assign({}, this.data);
      this.reset();
      this.session.get(true);
    } catch (error) {
      if (error.response) {
        this.state.submit.state = -1;
        this.state.submit.message = error.response.body.message;
      } else {
        this.state.submit.state = -1;
        this.state.submit.message = 'There was an issue updating your profile';
      }
    }
    this.state.submit.loading = false;
  }

  public async submitPassword() {
    if (this.state.password.state === -1 && this.state.confirmPassword.state === -1) { return; }
    this.state.reset.loading = true;
    try {
      const payload = await superagent.post(`${env.api}/user/password`).send(this.resetPassword).withCredentials();
      this.state.reset.state = 0;
      this.state.reset.message = '';
      this.resetPassword = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      };
      this.reset();
    } catch (error) {
      if (error.response) {
        this.state.reset.state = -1;
        this.state.reset.message = error.response.body.message;
      } else {
        this.state.reset.state = -1;
        this.state.reset.message = 'There was an issue updating your profile';
      }
    }
    this.state.reset.loading = false;
  }

  public reset() {
    this.state = {
      submit: {
        state: 0,
        loading: false,
        message: '',
      },
      username: {
        state: 0,
        loading: false,
        message: '',
      },
      email: {
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
      reset: {
        state: 0,
        loading: false,
        message: '',
      },
    };
  }

}
