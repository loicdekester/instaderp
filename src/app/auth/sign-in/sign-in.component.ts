import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MyFireService } from 'src/app/service/myFireService/my-fire.service';
import { ToasterService } from 'src/app/service/toasterService/toaster.service';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private toaster: ToasterService, private myFire: MyFireService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password).then(userCredential => {
      if (userCredential.user.emailVerified) {
        return this.myFire.getUserFromDatabase(userCredential.user.uid);
      } else {
        const message = `Your email has not yet been verified. Please check your inbox and follow the steps in the verification email to complete your subscription. If you don't find the email please check your spam folder`;
        this.toaster.display('error', message);
        firebase.auth().signOut();
      }
    }).then(userData => {
      if (userData) {
        this.userService.set(userData);
        this.router.navigate(["/myposts"]);
      }
    }).catch(err => {
      this.toaster.display('error', err.message, 3000);
    })
  }

}
