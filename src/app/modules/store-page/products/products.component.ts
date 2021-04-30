import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../share/models/product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // propiedades
  products: Product[];
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }
}
