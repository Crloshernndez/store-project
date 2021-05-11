import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PoliticyPageComponent } from './politicy-page.component';

@NgModule({
  declarations: [PoliticyPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PoliticyPageComponent }]),
  ],
  exports: [RouterModule],
})
export class PoliticyModule {}
