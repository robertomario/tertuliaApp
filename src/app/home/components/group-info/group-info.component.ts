import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { GroupModel } from '../../../core/models/group.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss'],
})
export class GroupInfoComponent implements OnInit, OnDestroy {
  group: GroupModel;
  subscribe: Subscription;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private dialog: MatDialog
  ) {
    this.subscribe = this.route.params
      .pipe(
        take(1),
        map((data) => data['id']),
        switchMap((id) =>
          this.db.object<GroupModel>(`groups/${id}`).valueChanges()
        ),
        map((data) => ({
          ...data,
          products: data.products ? Object.values(data.products) : [],
        }))
      )
      .subscribe((data) => (this.group = data));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  openModal() {
    this.dialog.open(AddProductModalComponent, { data: this.group.uid });
  }

  addQuantity(product: ProductModel) {
    this.route.params
      .pipe(
        take(1),
        map((data) => data['id']),
        switchMap((id) =>
          this.db
            .object(`groups/${id}/products/${product.uid}`)
            .update({ quantity: product.quantity + 1 })
        )
      )
      .subscribe();
  }

  removeQuantity(product: ProductModel) {
    if (product.quantity == 0) {
      return;
    }
    this.route.params
      .pipe(
        take(1),
        map((data) => data['id']),
        switchMap((id) =>
          this.db
            .object(`groups/${id}/products/${product.uid}`)
            .update({ quantity: product.quantity - 1 })
        )
      )
      .subscribe();
  }
}
