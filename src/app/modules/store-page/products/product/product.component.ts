import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../../share/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //variable que recibira contenido desde modulo padre
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
