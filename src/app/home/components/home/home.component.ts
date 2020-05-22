import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs/operators';
import { ProductModel } from './../../../core/models/product.model'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  $productList: Observable<ProductModel[]>;

  constructor(private dialog: MatDialog, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.$productList = this.afAuth.user.pipe(
      take(1),
      switchMap(
        (user) =>
          this.db.list<ProductModel>(`products/${user.uid}`).valueChanges()
      )
    );
  }

  ngOnInit(): void {
    //this.dialog.open(AddProductModalComponent);
  }

  openDialogAddProduct(){
    this.dialog.open(AddProductModalComponent);
  }

  addQuantity(product: ProductModel) {
    this.afAuth.user.pipe(
      take(1),
      switchMap((user) =>
        this.db.object(`products/${user.uid}/${product.uid}`)
          .update({quantity: product.quantity + 1})
      )
    ).subscribe()
  }

  removeQuantity(product: ProductModel) {
    if(product.quantity==0){
      return;
    }
    this.afAuth.user.pipe(
      take(1),
      switchMap((user) =>
        this.db.object(`products/${user.uid}/${product.uid}`)
          .update({quantity: product.quantity - 1})
      )
    ).subscribe()
  }

}
