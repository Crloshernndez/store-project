import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersService } from '../../core/services/orders.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  orderData;
  total;
  constructor(
    private router: Router,
    private orderService: OrdersService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.orderService.order$.subscribe((order) => {
      this.orderData = order;
    });
    this.cartService.cart$.subscribe((cartProducts) => {
      this.total = cartProducts.reduce((sum, { price }) => sum + price, 0);
    });
  }

  onClick() {
    this.router.navigate(['/orders']);
  }

  onExit() {
    this.router.navigate(['/cart']);
  }
}
