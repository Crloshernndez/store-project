import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  subtotal = 0;
  total;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((products) => {
      this.total = products.reduce((sum, { price }) => sum + price, 0);
    });
  }
}
