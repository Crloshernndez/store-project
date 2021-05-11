import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    FormsModule,
    RouterModule,
  ],
})
export class ShareModule {}
