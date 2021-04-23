import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { AboutUsPageComponent } from './modules/about-us-page/about-us-page.component';
import { BlogPageComponent } from './modules/blog-page/blog-page.component';
import { CartPageComponent } from './modules/cart-page/cart-page.component';
import { CheckOutPageComponent } from './modules/check-out-page/check-out-page.component';
import { CoursesPageComponent } from './modules/courses-page/courses-page.component';
import { OrdersPageComponent } from './modules/orders-page/orders-page.component';
import { PaymentPageComponent } from './modules/payment-page/payment-page.component';
import { PoliticyPageComponent } from './modules/politicy-page/politicy-page.component';
import { StorePageComponent } from './modules/store-page/store-page.component';
import { PageNotFountPageComponent } from './modules/page-not-fount-page/page-not-fount-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent,
  },
  {
    path: 'blog',
    component: BlogPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'check-out',
    component: CheckOutPageComponent,
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
  },
  {
    path: 'politicy',
    component: PoliticyPageComponent,
  },
  {
    path: 'store',
    component: StorePageComponent,
  },
  {
    path: '**',
    component: PageNotFountPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
