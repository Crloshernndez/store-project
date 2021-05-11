import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/authentication/auth.service';
import { UserService } from '../../../core/services/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    // INDICAMOS A LA PROPIEDAD ISAUTHENTICADED SI EXISTE UN USUARIO CONECTADO
    this.authService.user.subscribe((user) => {
      this.isAuthenticaded = user ? true : false;
    });

    //OBSERVAMOS EL CART DE USUARIO Y SUMAMOS SUS PRODUCTOS
    this.userService.cart$.subscribe((products) => {
      this.quantity = products.reduce((sum, { quantity }) => sum + quantity, 0);
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
