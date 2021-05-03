import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../../share/models/product.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Product[]>([]);
  private products: Product[] = [];

  constructor(private productService: ProductsService) {}

  // metodo para obtener todos os productos existentes en el carrito
  getProducts() {
    return this.products;
  }

  // metodo para agregar productos al carrito
  addProduct(product: Product) {
    console.log(product);

    let cartUpdated;
    let quantity = 1;
    const existingProductIndex = this.products.findIndex(
      (p) => p.id === product.id
    );

    const existingProduct = this.products[existingProductIndex];
    let updatedProduct;

    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.quantity = updatedProduct.quantity + 1;
      updatedProduct.price = product.price * updatedProduct.quantity;
      cartUpdated = [...this.products];
      cartUpdated[existingProductIndex] = updatedProduct;
    } else {
      product.quantity = quantity;
      updatedProduct = product;
      cartUpdated = [...this.products, updatedProduct];
    }
    // updatedProduct.price = updatedProduct.price * updatedProduct.quantity
    this.products = cartUpdated;
    this.cart.next(this.products);
    console.log(this.products);
  }

  // metodo para eliminar un productos del carrito
  deleteProduct(product) {
    let selectedProduct = this.productService.getProductById(product.id);
    let cartUpdated;
    const productIndex = this.products.findIndex((p) => p.id === product.id);

    const productToDelete = this.products[productIndex];

    let updatedProduct;
    if (productToDelete.quantity > 1) {
      updatedProduct = { ...productToDelete };
      updatedProduct.quantity = updatedProduct.quantity - 1;
      updatedProduct.price = selectedProduct.price * updatedProduct.quantity;
      console.log(updatedProduct);

      cartUpdated = [...this.products];
      cartUpdated[productIndex] = updatedProduct;
    } else {
      cartUpdated = [...this.products];
      cartUpdated.splice(productIndex, 1);
    }
    this.products = cartUpdated;
    this.cart.next(this.products);
  }
}
