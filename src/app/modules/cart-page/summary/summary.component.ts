import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  subtotal = 0;
  total;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.cart$.subscribe((products) => {
      this.total = products.reduce((sum, { price }) => sum + price, 0);
    });
  }
}
