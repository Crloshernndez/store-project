import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, exhaustMap } from 'rxjs/operators';

import { User } from '../../share/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  updatedUser;
  constructor(private http: HttpClient) {}

  public createUser(newUser: User) {
    return this.http.post(
      `${environment.FirebaseConfig.databaseURL}/users.json`,
      newUser
    );
  }

  private getUsers() {
    return this.http
      .get(`${environment.FirebaseConfig.databaseURL}/users.json`)
      .pipe(
        map((data) => {
          const users = Object.values(data);
          users.map((user) => {
            return {
              ...user,
              cart: user.cart ? user.cart : [],
              orders: user.orders ? user.orders : [],
            };
          });
        })
      );
  }

  public getUser(id: string) {
    return this.http
      .get(`${environment.FirebaseConfig.databaseURL}/users.json`)
      .pipe(
        map((users) => {
          const arrayOfUsers = Object.entries(users);
          const requestedUser = arrayOfUsers.find((user) => user[1].id === id);
          return {
            ...requestedUser[1],
            userId: requestedUser[0],
            cart: requestedUser[1].cart ? requestedUser[1].cart : [],
            orders: requestedUser[1].orders ? requestedUser[1].orders : [],
          };
        })
      );
  }

  public updateUser(id: string, value) {
    this.getUser(id)
      .pipe(
        exhaustMap((user) => {
          this.getUpdatedUser(user, value);
          return this.http.put(
            `${environment.FirebaseConfig.databaseURL}/users/${user.userId}.json`,
            this.updatedUser
          );
        })
      )
      .subscribe();
  }
  private getUpdatedUser(user: User, value) {
    if (!value.products) {
      this.updatedUser = { ...user, cart: value };
      console.log('actualizo cart');
    } else {
      this.updatedUser = { ...user, orders: value };
      console.log('actualizo order');
    }
  }
}
