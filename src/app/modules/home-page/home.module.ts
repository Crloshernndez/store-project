import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [HomePageComponent, HeroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
  ],
  exports: [RouterModule],
})
export class HomeModule {}
