import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { PaymentPageComponent } from './payment-page.component';
import { ProductTabComponent } from './product-tab/product-tab.component';

@NgModule({
  declarations: [PaymentPageComponent, ProductTabComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaymentPageComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PaymentModule {}
