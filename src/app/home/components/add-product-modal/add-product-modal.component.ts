import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  saveForm: FormGroup;
  isLoad = false;

  constructor(private db: AngularFireDatabase, formBuilder: FormBuilder, private afAuth: AngularFireAuth, private dialogRef: MatDialogRef<AddProductModalComponent>) {
    this.saveForm = formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.nullValidator]
    })
  }

  ngOnInit(): void {
  }

  save() {
    this.isLoad = true;
    const {name, quantity, description} = this.saveForm.value;
    this.afAuth.user.pipe(take(1)).subscribe((user) => {
      const uid = this.db.createPushId();
      this.db
        .object(`products/${user.uid}/${uid}`)
        .set({ name, quantity, description, uid});
    })
    this.isLoad = false;
    this.dialogRef.close('Saved');
  }
}
