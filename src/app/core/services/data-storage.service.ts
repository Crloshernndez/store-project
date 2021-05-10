import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, exhaustMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../share/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post(
      `${environment.FirebaseConfig.databaseURL}/users.json`,
      user
    );
  }

  // METODO PARA OBTENER TODOS LOS USUARIOS
  getUsers() {
    return this.http
      .get(`${environment.FirebaseConfig.databaseURL}/users.json`)
      .pipe(
        // INDICAMOS QUE SOLO MANDE LOS VALUES DE CADA USUARIO
        map((data) => {
          const users = Object.values(data);
          users.map((user) => {
            return { ...user, cart: user.cart ? user.cart : [] };
          });
        })
      );
  }

  getUser(id: string) {
    return this.http
      .get(`${environment.FirebaseConfig.databaseURL}/users.json`)
      .pipe(
        // INDICAMOS QUE NOS MANDE EL USUARIO CON EL ID
        map((users) => {
          const userEntries = Object.entries(users);

          const user = userEntries.find((user) => user[1].id === id);
          console.log(user);
          return {
            ...user[1],
            userId: user[0],
            cart: user[1].cart ? user[1].cart : [],
          };
        })
      );
  }

  updateUser(id: string, cart) {
    this.getUser(id)
      .pipe(
        exhaustMap((user) => {
          const userToUpdated = user;
          const userUpdated = { ...userToUpdated, cart: cart };
          console.log(userUpdated);
          return this.http.put(
            `${environment.FirebaseConfig.databaseURL}/users/${userUpdated.userId}.json`,
            userUpdated
          );
        })
      )
      .subscribe();
  }
}
