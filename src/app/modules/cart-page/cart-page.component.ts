import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import { ProductCart } from '../../share/models/productCart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  products: ProductCart[];
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  onClick() {
    this.router.navigate(['/check-out']);
  }
}
