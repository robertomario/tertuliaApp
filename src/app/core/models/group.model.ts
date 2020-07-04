import { ProductModel } from './product.model';

export interface GroupModel {
  name: string;
  uid: string;
  members: string[];
  products: ProductModel[];
}
