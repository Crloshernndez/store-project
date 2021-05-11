import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StorePageComponent } from './store-page.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

@NgModule({
  declarations: [
    StorePageComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StorePageComponent,
        children: [
          {
            path: 'product/:id',
            component: ProductDetailComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StoreModule {}
