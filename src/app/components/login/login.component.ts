import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  erro = ' ';

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.erro = '';
    const {email, password} = this.loginForm.value;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.router.navigate(['home']);
    }).catch(err => {
      this.erro = err.message;
    });
  }

}
