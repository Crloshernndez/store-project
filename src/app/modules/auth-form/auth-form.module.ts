import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthFormComponent } from './auth-form.component';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: AuthFormComponent }]),
  ],
  exports: [RouterModule],
})
export class AuthFormModule {}
