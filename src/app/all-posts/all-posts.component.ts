import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  allRef: any;
  loadMoreRef: any;
  allPosts: any = [];

  constructor() { }

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

  ngOnDestroy() {
    this.allRef.off();
  }

}
