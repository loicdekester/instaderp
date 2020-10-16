import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyFireService } from '../service/myFireService/my-fire.service';
import { ToasterService } from '../service/toasterService/toaster.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {
  personalPostsRef: any;
  postList: any[] = [];

  constructor(private myFire: MyFireService, private toaster: ToasterService) {

  }

  ngOnInit(): void {
    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myFire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postList.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file).then(data => {
        this.toaster.display('success', 'Picture Successfully uploaded!!');
        return this.myFire.handleImageUpload(data);
      })
        .catch(err => {
          this.toaster.display('error', err.message);
          console.log(err);
        });
    }
  }

  ngOnDestroy() {
    this.personalPostsRef.off();
  }

}
