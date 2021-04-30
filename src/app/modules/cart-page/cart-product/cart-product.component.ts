import { Component, OnInit, Input } from '@angular/core';

import { ProductCart } from '../../../share/models/productCart.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input() product: ProductCart;
  constructor() {}

  ngOnInit(): void {}
}
