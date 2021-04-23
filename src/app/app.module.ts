import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { AboutUsPageComponent } from './modules/about-us-page/about-us-page.component';
import { StorePageComponent } from './modules/store-page/store-page.component';
import { CoursesPageComponent } from './modules/courses-page/courses-page.component';
import { CartPageComponent } from './modules/cart-page/cart-page.component';
import { PaymentPageComponent } from './modules/payment-page/payment-page.component';
import { PoliticyPageComponent } from './modules/politicy-page/politicy-page.component';
import { OrdersPageComponent } from './modules/orders-page/orders-page.component';
import { PageNotFountPageComponent } from './modules/page-not-fount-page/page-not-fount-page.component';
import { CheckOutPageComponent } from './modules/check-out-page/check-out-page.component';
import { BlogPageComponent } from './modules/blog-page/blog-page.component';
import { HeaderComponent } from './share/components/header/header.component';
import { FooterComponent } from './share/components/footer/footer.component';

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
    BlogPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
