import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() imageName: string;
  @Input() displayPostedBy: boolean = true;
  displayFavoritesButton: boolean = true;
  displayFollowButton: boolean = true;
  @Output() favoriteClicked = new EventEmitter<any>();
  @Output() followClicked = new EventEmitter<any>();
  defaultImage: string = "http://via.placeholder.com/150x150";
  imageData: any = {};

  constructor() { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;

    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then(snapshot => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;
        if (this.imageData.uploadedBy.uid === uid) {
          this.displayFavoritesButton = false;
          this.displayFollowButton = false;
        }
      });
  }

  onFavoritesClicked() {
    this.favoriteClicked.emit(this.imageData);
  }

  onFollowClicked() {
    this.followClicked.emit(this.imageData);
  }
}
