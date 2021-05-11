import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFountPageComponent } from './modules/page-not-fount-page/page-not-fount-page.component';
import { LayoutComponent } from './modules/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home-page/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./modules/about-us-page/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      },
      {
        path: 'portafolio',
        loadChildren: () =>
          import('./modules/portafolio-page/portafolio.module').then(
            (m) => m.PortafolioModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./modules/cart-page/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'check-out',
        loadChildren: () =>
          import('./modules/check-out-page/check-out.module').then(
            (m) => m.CheckOutModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./modules/courses-page/courses.module').then(
            (m) => m.CoursesModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/orders-page/orders.module').then(
            (m) => m.OrdersModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./modules/payment-page/payment.module').then(
            (m) => m.PaymentModule
          ),
      },
      {
        path: 'policies',
        loadChildren: () =>
          import('./modules/politicy-page/politicy.module').then(
            (m) => m.PoliticyModule
          ),
      },
      {
        path: 'store',
        loadChildren: () =>
          import('./modules/store-page/store.module').then(
            (m) => m.StoreModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth-form/auth-form.module').then(
            (m) => m.AuthFormModule
          ),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFountPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
