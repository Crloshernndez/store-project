import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/authentication/auth.service';
import { UserService } from '../../core/services/user.service';
import { Product } from '../../share/models/product.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  products: Product[];
  userId: string;
  constructor(
    private router: Router,
    // private cartService: CartService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // OBTENEMOS LOS PRODUCTOS DEL CARRITO DEL USER
    this.userService.cart$.subscribe((products) => {
      this.products = products;
    });

    // OBTENEMOS EL ID DEL USUARIO CONECTADO
    this.authService.user.subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  // METODO PARA EL BOTON DE CONNTINUAR
  onClick() {
    this.router.navigate(['/check-out']);
  }

  // METODO PARA ELIMINAR PRODUCTOS DEL CARRITO
  DeleteAllCart() {
    this.userService.deleteAllProducts(this.userId);
  }
}
