import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import * as firebase from 'firebase';
import { ToasterService } from 'src/app/service/toasterService/toaster.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private toaster: ToasterService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(userData => {
      userData.user.sendEmailVerification();
      const message = `A verification email has been sent to ${email}. Check your inbox and follow the steps
         in the verification email to complete your subscription. Once verification is complete, please login to the application`;
      this.toaster.display('success', message, 6000);
      return firebase.database().ref('users/' + userData.user.uid).set({
        email: email,
        uid: userData.user.uid,
        registrationDate: new Date().toString(),
        name: fullname
      })
        .then(() => {
          firebase.auth().signOut();
        });
    }).catch(err => {
      this.toaster.display('error', err.message, 3000);
    });
  }

}
