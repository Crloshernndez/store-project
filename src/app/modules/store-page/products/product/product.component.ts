import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../../share/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //variable que recibira contenido desde modulo padre
  @Input() product: Product;
  isAuthenticate: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  onClick(product: Product) {
    this.cartService.addProduct(product);
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticate = true;
      } else {
        this.isAuthenticate = false;
      }
    });
  }
}
