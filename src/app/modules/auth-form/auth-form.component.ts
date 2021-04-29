import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {
  AuthService,
  authResponseData,
} from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  // propiedades
  isLoginMode: boolean = true;
  loading: boolean = false;
  error: string = null; // propiedad que almacenara el mensaje del error

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // metodo para enviar los datos del formulario
  onSubmit(authform: NgForm) {
    if (!authform.valid) {
      return;
    }
    const email = authform.value.email;
    const password = authform.value.password;

    // variable que guardara el observeble
    let authObs: Observable<authResponseData>;

    // si el usuario se quiere registrar
    if (!this.isLoginMode) {
      authObs = this.authService.singUp(email, password);
      // si el usuario se quiere logear
    } else {
      authObs = this.authService.singIn(email, password);
    }

    this.loading = true;

    // logica para la subscipcion de los observables
    authObs.subscribe(
      (data) => {
        console.log(data);
        this.loading = false;
      },
      (error) => {
        // asignamos a la propiedad error el mensaje del error
        this.error = error;
        this.loading = false;
      }
    );
    authform.reset();
  }

  // metodo para cambiar el funcion del formulario
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // metodo para cerrar el modal del error
  onClose() {
    this.error = null;
  }

  // metodo para salir del formulario
  handleExit() {
    this.router.navigate(['/']);
  }
}
