import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.css'],
})
export class ProductTabComponent implements OnInit {
  @Input() product;
  constructor() {}

  ngOnInit(): void {}
}
