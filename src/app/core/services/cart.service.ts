import { Injectable } from '@angular/core';

import { ProductCart } from '../../share/models/productCart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsCart: ProductCart[] = [
    {
      id: '1',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      name: 'rojo',
      quantity: 1,
      price: 99.9,
    },
    {
      id: '2',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      name: 'rojo',
      quantity: 2,
      price: 99.9,
    },
    {
      id: '3',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      name: 'rojo',
      quantity: 3,
      price: 99.9,
    },
  ];
  constructor() {}

  getProducts() {
    return this.productsCart;
  }
}
