import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {
      // Login http request
    } else {
      this.authService.signup(email, password).subscribe((responseData) => {
        console.log(responseData);
      }, error => {
        console.log(error);
      });
    }

    form.reset();
  }

  ngOnInit(): void {}
}
