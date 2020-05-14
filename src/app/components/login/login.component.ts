import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constador = 10;
  error = '';

  isLoad = false;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  goToLogin() {
    this.isLoad = true;
    this.error = '';
    const { password, email } = this.loginForm.value;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['home']);
        this.isLoad = false;
      })
      .catch(({ message }) => {
        this.error = message;
        this.isLoad = false;
      });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  getError(control: AbstractControl) {
    if (control.hasError('email')) {
      return 'Email invalid';
    } else if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('minlength')) {
      return `The min character of the password is ${control.errors.minlength.requiredLength}`;
    } else {
      return 'Any error';
    }
  }
}
