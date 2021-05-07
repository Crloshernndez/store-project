import { Product } from './product.model';

export class UserCart {
  userId: string;
  products: Product[];
  constructor(userId: string, products: Product[]) {
    (this.userId = userId), (this.products = products);
  }
}
