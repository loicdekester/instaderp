import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteList: any = []

  constructor() { }

  ngOnInit(): void {
    const uid = firebase.auth().currentUser.uid;
    const favRef = firebase.database().ref('favorites').child(uid);
    favRef.once('value').then(snapshot => {
      this.favoriteList = Object.values(snapshot.val());
    });
  }

}
