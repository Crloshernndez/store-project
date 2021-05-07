import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../../share/models/user.model';

// interfaz de respuesta desde firebase para authentication
export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // propiedades
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  // metodo para registrar usuario
  singUp(email: string, password: string) {
    return this.http
      .post<authResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FirebaseApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        })
      );
  }

  // metodo para logear usuario
  singIn(email: string, password: string) {
    return this.http
      .post<authResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FirebaseApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        })
      );
  }

  // metodo para desloguear usuario
  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // metodo para logear automaticamente
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loaderUser = new User(
      userData.email,
      userData.id,
      [],
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loaderUser.token) {
      this.user.next(loaderUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  // metodo para desloguear automaticamente
  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  // metodo para autenticar usuario
  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, [], token, expirationDate);
    this.user.next(user);
    this.autoLogOut(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/']);
  }

  // metodo para manejar errores
  private handleError(resError: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occurred!!';

    if (!resError.error || !resError.error.error) {
      return throwError(errorMessage);
    }

    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exist!!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password Invalid!!!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'To Many Attempts, Please Try Later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Exist!!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password Invalid!!!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User Disabled';
        break;
    }

    return throwError(errorMessage);
  }
}
