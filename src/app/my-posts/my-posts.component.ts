import { Component, OnInit } from '@angular/core';
import { MyFireService } from '../service/myFireService/my-fire.service';
import { ToasterService } from '../service/toasterService/toaster.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private myFire: MyFireService, private toaster: ToasterService) { }

  ngOnInit(): void {
  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file).then(data => {
        this.toaster.display('success', 'Picture Successfully uploaded!!');
      })
        .catch(err => {
          this.toaster.display('error', err.message);
          console.log(err);
        });
    }


  }

}
