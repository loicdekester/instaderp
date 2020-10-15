import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string = "";
  email: string = "";
  uid: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;
        const user = this.userService.getProfile();
        this.name = user.name;
        this.email = user.email;
        this.uid = user.uid;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    firebase.auth().signOut().then(() => {
      this.userService.destroy();
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    });
  }

}
