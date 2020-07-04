import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() addProduct = new EventEmitter<ProductModel>();
  @Output() removeProduct = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
  }

}
