import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageNotFountPageComponent } from './modules/page-not-fount-page/page-not-fount-page.component';
import { LayoutComponent } from './modules/layout/layout.component';

import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [AppComponent, PageNotFountPageComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ShareModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
