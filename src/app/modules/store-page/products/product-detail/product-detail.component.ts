import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../share/models/product.model';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  // prodiedad que recibira los datos del producto
  product: Product;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //obtenemos el id por parametro y con el id obtenemos el producto y lo asignamos a la propiedad
    this.route.params.subscribe((params) => {
      this.product = this.productService.getProductById(params['id']);
    });
  }

  onClick() {
    this.router.navigate(['/store']);
  }
}
