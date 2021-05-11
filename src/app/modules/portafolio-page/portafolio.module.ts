import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PortafolioPageComponent } from './portafolio-page.component';

@NgModule({
  declarations: [PortafolioPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PortafolioPageComponent }]),
  ],
  exports: [RouterModule],
})
export class PortafolioModule {}
