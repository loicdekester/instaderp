import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { MyFireService } from '../service/myFireService/my-fire.service';
import { ToasterService } from '../service/toasterService/toaster.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  allRef: any;
  loadMoreRef: any;
  allPosts: any = [];

  constructor(private myFire: MyFireService, private toaster: ToasterService) { }

  ngOnInit(): void {
    this.allRef = firebase.database().ref('allposts').limitToFirst(3);
    this.allRef.on('child_added', data => {
      this.allPosts.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  onLoadMore() {
    if (this.allPosts.length > 0) {
      const lastLoadedPost = this.allPosts[this.allPosts.length - 1];
      const lastLoadedPostKey = lastLoadedPost.key;
      this.loadMoreRef = firebase.database().ref('allposts').startAt(null, lastLoadedPostKey).limitToFirst(3 + 1);
      this.loadMoreRef.on('child_added', data => {
        if (data.key === lastLoadedPostKey) {
          return;
        } else {
          this.allPosts.push({
            key: data.key,
            data: data.val()
          });
        }
      });

    }
  }

  onFavoritesClicked(imageData) {
    this.myFire.handleFavoriteClicked(imageData).then(data => {
      this.toaster.display('success', 'Image added to favorites');
    }).catch(err => {
      this.toaster.display('error', 'Error adding image to favorites');
    });
  }

  onFollowClicked(imageData) {
    this.myFire.followUser(imageData).then(data => {
      this.toaster.display('success', `Following ${imageData.uploadedBy.name}!`);
    }).catch(err => {
      this.toaster.display('error', 'Error following User');
    });
  }

  ngOnDestroy() {
    this.allRef.off();
    if (this.loadMoreRef) {
      this.loadMoreRef.off();
    }
  }

}
