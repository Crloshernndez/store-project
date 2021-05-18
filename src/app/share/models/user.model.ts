import { Product } from './product.model';
import { Order } from './order.model';

export class User {
  constructor(
    public email: string,
    public id: string,
    public cart?: Product[],
    public orders?: Order[],
    private _token?: string,
    private _tokenExpirationDate?: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
