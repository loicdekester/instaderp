import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    const messaging = firebase.messaging();

    messaging.getToken()
      .then(token => {
        console.log('Token received: ', token);

        messaging.onMessage(payload => {
          console.log(payload);
          // TODO: display in toaster
        });

        const updates = {};
        updates['/users/' + userFromDatabase.uid + "/messageToken"] = token;
        return firebase.database().ref().update(updates);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getProfile() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  destroy() {
    localStorage.removeItem('user');
  }
}
