import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { OrdersPageComponent } from './orders-page.component';

@NgModule({
  declarations: [OrdersPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersPageComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OrdersModule {}
