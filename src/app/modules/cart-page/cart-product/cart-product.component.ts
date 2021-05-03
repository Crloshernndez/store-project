import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../share/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input() product: Product;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onClick(product) {
    this.cartService.deleteProduct(product);
  }
}
