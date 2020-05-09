import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error = '';

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.error = '';
    const {email, password} = this.registerForm.value;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['home']))
      .catch(({message}) => (this.error=message));
  }
}
