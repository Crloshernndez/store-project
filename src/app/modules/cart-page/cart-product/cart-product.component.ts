import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../../core/authentication/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../share/models/product.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input() product: Product;
  idUserActive: string;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((userActive) => {
      if (userActive) {
        this.idUserActive = userActive.id;
      } else {
        console.log('not connected user');
      }
    });
  }

  onClick(product) {
    this.cartService.deleteProductFromCart(this.idUserActive, product);
  }

  increaseProduct(product: Product) {
    this.cartService.addProductToUserCart(this.idUserActive, product);
  }
}
