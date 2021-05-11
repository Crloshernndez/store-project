import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartPageComponent } from './cart-page.component';
import { SummaryComponent } from './summary/summary.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { AuthGuardService } from '../../core/guards/auth-guard.service';

@NgModule({
  declarations: [CartPageComponent, SummaryComponent, CartProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartPageComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CartModule {}
