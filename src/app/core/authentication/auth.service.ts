import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User } from '../../share/models/user.model';
import { environment } from '../../../environments/environment';
import { UserService } from '../services/user.service';

// interfaz de respuesta desde firebase para authentication
export interface modelOfRequestResponse {
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
  user$ = new BehaviorSubject<User>(null);
  userInstance: User;
  expirationTimeOfToken: Date;
  tokenExpirationTimer: any = null;
  localStorageData: any;
  activeUser: any;
  existingUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  // metodo para registrar usuario
  public singUpUser(email: string, password: string) {
    return this.http
      .post<modelOfRequestResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FirebaseConfig.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrorOfRequest),
        tap((response) => {
          this.handleUserAuthentication(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        })
      );
  }

  // metodo para logear usuario
  public singInUser(email: string, password: string) {
    return this.http
      .post<modelOfRequestResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FirebaseConfig.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrorOfRequest),
        tap((response) => {
          this.handleUserAuthentication(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        })
      );
  }

  // metodo para autenticar usuario
  private handleUserAuthentication(
    email: string,
    id: string,
    token: string,
    tokenExpirationTime: string
  ) {
    this.userService.getUser(id).subscribe((user) => {
      this.existingUser = user;
      this.createUserInstance(email, id, token, tokenExpirationTime);
      localStorage.setItem('userData', JSON.stringify(this.userInstance));
      this.router.navigate(['/']);
    });
  }

  private createUserInstance(
    email: string,
    id: string,
    token: string,
    tokenExpirationTime: string
  ) {
    this.getexpirationTimeOfToken(tokenExpirationTime);
    if (this.existingUser) {
      this.userInstance = new User(
        email,
        id,
        this.existingUser.cart,
        this.existingUser.orders,
        token,
        this.expirationTimeOfToken
      );
    } else {
      console.log('paso por aqui');

      this.userInstance = new User(
        email,
        id,
        [],
        [],
        token,
        this.expirationTimeOfToken
      );
    }
    this.user$.next(this.userInstance);
  }

  private getexpirationTimeOfToken(tokenExpirationTime: string) {
    this.expirationTimeOfToken = new Date(
      new Date().getTime() + +tokenExpirationTime * 1000
    );
    this.autoLogOutOfUser(+tokenExpirationTime * 1000);
  }

  private autoLogOutOfUser(timeOfTokenExpiration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOutUser();
    }, timeOfTokenExpiration);
  }

  public logOutUser() {
    this.user$.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // metodo para logear automaticamente
  public autoLoginOfUser() {
    this.getActiveUser();

    if (this.activeUser.token) {
      this.user$.next(this.activeUser);
      const durationOfTokenExpiration =
        new Date(this.activeUser._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOutOfUser(durationOfTokenExpiration);
    }
  }

  private getActiveUser() {
    this.getLocalStorageData();
    if (!this.localStorageData) {
      return;
    }
    this.activeUser = new User(
      this.localStorageData.email,
      this.localStorageData.id,
      [],
      [],
      this.localStorageData._token,
      new Date(this.localStorageData._tokenExpirationDate)
    );
  }

  private getLocalStorageData() {
    this.localStorageData = JSON.parse(localStorage.getItem('userData'));
  }

  // metodo para manejar errores
  private handleErrorOfRequest(resError: HttpErrorResponse) {
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
