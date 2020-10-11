import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor() { }

  canActivate() {
    if (firebase.auth().currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
