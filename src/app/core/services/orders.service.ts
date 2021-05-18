import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Order } from 'src/app/share/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  order$ = new BehaviorSubject<Order>(null);

  private order;

  constructor() {}

  getOrders() {}

  getOrder() {}

  updateOrder(data, keyToUpdate) {
    if (keyToUpdate === 'products') {
      this.order = { ...this.order, products: data };
    } else if (keyToUpdate === 'userInformation') {
      this.order = { ...this.order, userInformation: data };
    }
    console.log(this.order);
    this.order$.next(this.order);
  }

  deleteOrder() {}
}
