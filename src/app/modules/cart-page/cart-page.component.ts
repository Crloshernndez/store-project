import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
// import { ProductCart } from '../../share/models/productCart.model';
import { Product } from '../../share/models/product.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  products: Product[];
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((products) => {
      this.products = products;
    });
  }

  onClick() {
    this.router.navigate(['/check-out']);
  }
}
