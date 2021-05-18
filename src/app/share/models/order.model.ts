import { Product } from './product.model';
import { UserCart } from './userCart.model';

export class Order {
  name: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  products: UserCart;
  id?: string;
  constructor(
    name: string,
    lastname: string,
    email: string,
    address: string,
    city: string,
    country: string,
    zipCode: string,
    products: UserCart,
    id: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.city = city;
    this.country = country;
    this.zipCode = zipCode;
    this.products = products;
    this.id = id;
  }
}
