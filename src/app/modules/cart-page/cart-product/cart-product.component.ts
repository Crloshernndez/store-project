import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../../core/authentication/auth.service';
import { Product } from '../../../share/models/product.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input() product: Product;
  userId: string;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.userId = user.id;
      } else {
        console.log('not connected user');
      }
    });
  }

  onClick(product) {
    this.userService.deleteProduct(this.userId, product);
  }

  increaseProduct(product: Product) {
    this.userService.addProductToCart(this.userId, product);
  }
}
