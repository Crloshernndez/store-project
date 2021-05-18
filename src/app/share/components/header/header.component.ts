import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/authentication/auth.service';
import { CartService } from '../../../core/services/cart.service';
// import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // propiedades
  total$: Observable<number>;
  collapsed = true;
  userAuthenticaded: boolean;
  quantityCartProducts: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // INDICAMOS A LA PROPIEDAD ISAUTHENTICADED SI EXISTE UN USUARIO CONECTADO
    this.authService.user$.subscribe((userActive) => {
      this.userAuthenticaded = userActive ? true : false;
    });

    //OBSERVAMOS EL CART DE USUARIO Y SUMAMOS SUS PRODUCTOS
    this.cartService.cart$.subscribe((cartProducts) => {
      console.log(cartProducts);

      this.quantityCartProducts = cartProducts.reduce(
        (sum, { quantity }) => sum + quantity,
        0
      );
    });
  }

  // click para manejar boton de cart
  onClick() {
    this.router.navigate(['/cart']);
  }

  // metodo para manejar boton de log
  onHandleLog() {
    if (this.userAuthenticaded) {
      this.authService.logOutUser();
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
