import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../../core/authentication/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // propiedades
  total$: Observable<number>;
  collapsed = true;
  isAuthenticaded: boolean = false;
  quantity: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticaded = user ? true : false;
    });
    // nos subscribimos al observable que nos indica cuando se agrego un producto al carrito
    this.cartService.cart.subscribe((product) => {
      // con reduce sumamos los valores de quantity

      this.quantity = product.reduce((sum, { quantity }) => sum + quantity, 0);
    });
  }

  // click para manejar boton de cart
  onClick() {
    this.router.navigate(['/cart']);
  }

  // metodo para manejar boton de log
  onHandleLog() {
    if (this.isAuthenticaded) {
      this.authService.logOut();
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
