import { Injectable } from '@angular/core';

import * as superagent from 'superagent';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public timeouts = {
    username: null,
    email: null,
    password: null,
  };

  constructor() { }

  public async validateUsername(username) {
    return new Promise(resolve => {
      clearTimeout(this.timeouts.username);

      this.timeouts.username = setTimeout(async () => {
        if (username.length < 3) {
          return resolve({
            state: -1,
            message: 'must be more then 3 characters',
          });
        } else if (!/^\w+$/.test(username)) {
          return resolve({
            state: -1,
            message: 'must be alphanumeric with underscores',
          });
        } else {
          try {
            await superagent.get(`${env.api}/username?username=${username}`);
            return resolve({
              state: 1,
              message: 'This username is available',
            });
          } catch (error) {
            return resolve({
              state: -1,
              message: 'This username is in use',
            });
          }
        }
      }, 1000);
    });
  }

  public validateEmail(email) {
    return new Promise(resolve => {
      clearTimeout(this.timeouts.email);
      this.timeouts.email = setTimeout(async () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
          try {
            await superagent.get(`${env.api}/email?email=${email}`);
            return resolve({
              state: 1,
              message: 'This email is available'
            });
          } catch (error) {
            return resolve({
              state: -1,
              message: 'This email is already in use'
            });
          }
        } else {
          return resolve({
            state: -1,
            message: 'This email is an invalid email'
          });
        }
      }, 1000);
    });
  }

  public validatePassword(password) {
    return new Promise(resolve => {
      clearTimeout(this.timeouts.password);

      this.timeouts.password = setTimeout(() => {
        if (password.length < 6) {
          return resolve({
            state: -1,
            message: 'must be more then 6 characters',
          });
        } else {
          return resolve({
            state: 1,
            message: 'This password is okay',
          });
        }
      }, 1000);
    });
  }

}
