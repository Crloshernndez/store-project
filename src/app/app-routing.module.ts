import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { AboutUsPageComponent } from './modules/about-us-page/about-us-page.component';
import { PortafolioPageComponent } from './modules/portafolio-page/portafolio-page.component';
import { CartPageComponent } from './modules/cart-page/cart-page.component';
import { CheckOutPageComponent } from './modules/check-out-page/check-out-page.component';
import { CoursesPageComponent } from './modules/courses-page/courses-page.component';
import { OrdersPageComponent } from './modules/orders-page/orders-page.component';
import { PaymentPageComponent } from './modules/payment-page/payment-page.component';
import { PoliticyPageComponent } from './modules/politicy-page/politicy-page.component';
import { StorePageComponent } from './modules/store-page/store-page.component';
import { PageNotFountPageComponent } from './modules/page-not-fount-page/page-not-fount-page.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { AuthFormComponent } from './modules/auth-form/auth-form.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ProductDetailComponent } from './modules/store-page/products/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'about-us',
        component: AboutUsPageComponent,
      },
      {
        path: 'portafolio',
        component: PortafolioPageComponent,
      },
      {
        path: 'cart',
        component: CartPageComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'check-out',
        component: CheckOutPageComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'courses',
        component: CoursesPageComponent,
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'payment',
        component: PaymentPageComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'policies',
        component: PoliticyPageComponent,
      },
      {
        path: 'store',
        component: StorePageComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'auth',
        component: AuthFormComponent,
      },
    ],
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
