import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
  isLoad = false;

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
    this.isLoad = true;
    this.error = '';
    const {email, password, name} = this.registerForm.value;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (usr) => {
        await usr.user.updateProfile({ displayName: name});
        this.isLoad = false;
        this.router.navigate(['home']);
      })
      .catch(({message}) => {
        this.error=message;
        this.isLoad = false;
      });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  getError(control: AbstractControl) {
    if (control.hasError('email')) {
      return 'Email invalid';
    } else if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('minlength')) {
      return `The minimum number of characters is ${control.errors.minlength.requiredLength}`;
    } else {
      return 'Unexpected error';
    }
  }
}
