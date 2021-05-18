import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../../share/models/product.model';
import { AuthService } from '../../../../core/authentication/auth.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  userAuthenticated: boolean;
  idUserActive: string;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((userActive) => {
      if (userActive) {
        this.userAuthenticated = true;
        this.idUserActive = userActive.id;
      } else {
        this.userAuthenticated = false;
      }
    });
  }

  //METODO PARA AGREGAR EL PRODUCTO AL CARRITO
  onClick(product: Product) {
    this.cartService.addProductToUserCart(this.idUserActive, product);
  }
}
