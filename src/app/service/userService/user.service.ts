import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
  }

  getProfile() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  destroy() {
    localStorage.removeItem('user');
  }
}
