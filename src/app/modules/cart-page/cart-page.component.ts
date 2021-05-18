import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/authentication/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { Product } from '../../share/models/product.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  products: Product[];
  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    // OBTENEMOS LOS PRODUCTOS DEL CARRITO DEL USER
    this.cartService.cart$.subscribe((cartProducts) => {
      this.products = cartProducts;
    });
  }

  // METODO PARA EL BOTON DE CONNTINUAR
  onClick() {
    this.orderService.updateOrder(this.products, 'products');
    this.router.navigate(['/check-out']);
  }

  // METODO PARA ELIMINAR PRODUCTOS DEL CARRITO
  DeleteAllCart() {
    this.authService.user$.subscribe((userActive) => {
      this.cartService.removeAllProducts(userActive.id);
    });
  }
}
