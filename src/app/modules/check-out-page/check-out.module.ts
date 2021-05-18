import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { CheckOutPageComponent } from './check-out-page.component';

@NgModule({
  declarations: [CheckOutPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckOutPageComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CheckOutModule {}
