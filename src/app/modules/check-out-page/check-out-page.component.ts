import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CartService } from '../../core/services/cart.service';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/authentication/auth.service';

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.css'],
})
export class CheckOutPageComponent implements OnInit {
  shippingForm: FormGroup;
  cart;
  userId;
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.cartService.cart$.subscribe((userCart) => {
      this.cart = userCart;
    });
    this.authService.user$.subscribe((user) => {
      this.userId = user.id;
    });
  }

  private initForm() {
    this.shippingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
    });
  }

  sendData() {
    this.onSubmit();
  }

  onSubmit() {
    if (!this.shippingForm.valid) {
      return console.log('not valid');
    }
    this.orderService.updateOrder(this.shippingForm.value, 'userInformation');
    this.router.navigate(['/payment']);
  }

  onClick() {
    this.router.navigate(['/cart']);
  }
}
