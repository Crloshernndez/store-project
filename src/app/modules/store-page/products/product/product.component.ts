import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../../share/models/product.model';
import { AuthService } from '../../../../core/authentication/auth.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //variable que recibira contenido desde modulo padre
  @Input() product: Product;
  isAuthenticate: boolean;
  userId: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticate = true;
        this.userId = user.id;
      } else {
        this.isAuthenticate = false;
      }
    });
  }

  //METODO PARA AGREGAR EL PRODUCTO AL CARRITO
  onClick(product: Product) {
    this.userService.addProductToCart(this.userId, product);
  }
}
