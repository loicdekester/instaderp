import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MyFireService {

  constructor() { }

  getUserFromDatabase(uid: string) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());

  }

  generateRandomName() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  uploadFile(file) {
    const fileName = this.generateRandomName();
    const fileRef = firebase.storage().ref().child('image/' + fileName)
    const uploadTask = fileRef.put(file);
    return new Promise((resolve, reject) => {
      uploadTask.on('stateChanged', snapshot => {
      }, error => {
        reject(error);
      }, () => {
        const fileURL = fileRef.getDownloadURL();
        resolve({ fileName, fileURL })
      });
    });
  }

}
