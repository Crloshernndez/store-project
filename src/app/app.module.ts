import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PoliticyPageComponent } from './politicy-page/politicy-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { PageNotFountPageComponent } from './page-not-fount-page/page-not-fount-page.component';
import { CheckOutPageComponent } from './check-out-page/check-out-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsPageComponent,
    StorePageComponent,
    CoursesPageComponent,
    CartPageComponent,
    PaymentPageComponent,
    PoliticyPageComponent,
    OrdersPageComponent,
    PageNotFountPageComponent,
    CheckOutPageComponent,
    BlogPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
