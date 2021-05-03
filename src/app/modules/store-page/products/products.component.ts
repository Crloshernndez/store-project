import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  // metodo para pasar el id del producto por parametro a la url
  onClick(id) {
    this.router.navigate(['/product', id]);
  }
}
