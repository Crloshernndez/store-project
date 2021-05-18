import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { CartService } from '../../core/services/cart.service';
import { User } from '../../share/models/user.model';

import {
  AuthService,
  modelOfRequestResponse,
} from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  // propiedades
  loginMode: boolean = true;
  loadingMode: boolean = false;
  errorMessage: string = null; // propiedad que almacenara el mensaje del error

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  // metodo para enviar los datos del formulario
  onSubmit(authform: NgForm) {
    if (!authform.valid) {
      return;
    }
    const email = authform.value.email;
    const password = authform.value.password;

    // variable que guardara el observeble
    let authObs$: Observable<modelOfRequestResponse>;

    // si el usuario se quiere registrar
    if (!this.loginMode) {
      authObs$ = this.authService.singUpUser(email, password);
      // si el usuario se quiere logear
    } else {
      authObs$ = this.authService.singInUser(email, password);
    }

    this.loadingMode = true;

    // logica para la subscipcion de los observables
    authObs$.subscribe(
      (userInfo) => {
        // LOGICA PARA CREAR EL USUARIO QUE SE ESTA REGISTRANDO
        if (!this.loginMode) {
          this.userService
            .createUser(new User(userInfo.email, userInfo.localId, []))
            .subscribe(() => {
              console.log('usuario creado');
            });
        }
        this.cartService.getUserCart(userInfo.localId);
        this.loadingMode = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loadingMode = false;
      }
    );
    authform.reset();
  }

  // metodo para cambiar el funcion del formulario
  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  // metodo para cerrar el modal del error
  onClose() {
    this.errorMessage = null;
  }

  // metodo para salir del formulario
  handleExit() {
    this.router.navigate(['/']);
  }
}
