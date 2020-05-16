import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  saveForm: FormGroup;

  constructor(private db: AngularFireDatabase, formBuilder: FormBuilder, private afAuth: AngularFireAuth) {
    this.saveForm = formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.nullValidator]
    })
  }

  ngOnInit(): void {
  }

  save() {
    const {name, quantity, description} = this.saveForm.value;
    this.afAuth.user.pipe(take(1)).subscribe((user) => {
      const uid = this.db.createPushId();
      this.db
        .object(`products/${user.uid}/${uid}`)
        .set({ name, quantity, description, uid});
    })
  }

}
