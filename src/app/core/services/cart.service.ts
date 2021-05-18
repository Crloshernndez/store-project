import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../../share/models/product.model';
import { UserService } from './user.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$ = new BehaviorSubject<Product[]>([]);
  private localCart: Product[] = [];
  private localCartUpdated: Product[];
  private updatedProduct: Product;
  private quantityOfTheProduct: number = 1;
  private existingProductIndex: number;
  private existingProductInTheCart: Product;
  private selectedProduct: Product;

  constructor(
    private productService: ProductsService,
    private userService: UserService
  ) {}

  getUserCart(id: string) {
    this.userService.getUser(id).subscribe((user) => {
      this.localCart = user.cart;
      this.cart$.next(this.localCart);
    });
  }

  //BLOQUE PARA AGREGAR PRODUCTO AL CARRITO

  public addProductToUserCart(id: string, product: Product) {
    this.updateLocalCartWithAddedProduct(product);
    this.userService.updateUser(id, this.localCart);
    this.cart$.next(this.localCart);
  }

  private updateLocalCartWithAddedProduct(product: Product) {
    this.getLocalCartUpdatedWithAddedProduct(product);
    this.localCart = this.localCartUpdated;
  }

  private getLocalCartUpdatedWithAddedProduct(product: Product) {
    this.getUpdatedProduct(product);
    if (this.existingProductInTheCart) {
      this.localCartUpdated = [...this.localCart];
      this.localCartUpdated[this.existingProductIndex] = this.updatedProduct;
    } else {
      this.localCartUpdated = [...this.localCart, this.updatedProduct];
    }
  }

  private getUpdatedProduct(product: Product) {
    this.checkProductInCart(product);
    if (this.existingProductInTheCart) {
      this.updatedProduct = { ...this.existingProductInTheCart };
      this.updatedProduct.quantity = this.updatedProduct.quantity + 1;
      this.updatedProduct.price =
        this.selectedProduct.price * this.updatedProduct.quantity;
    } else {
      product.quantity = this.quantityOfTheProduct;
      this.updatedProduct = product;
    }
  }

  private checkProductInCart(product: Product) {
    this.getDataOfTheSelectedProduct(product);
    this.existingProductIndex = this.localCart.findIndex(
      (p) => p.id === product.id
    );
    this.existingProductInTheCart = this.localCart[this.existingProductIndex];
  }

  private getDataOfTheSelectedProduct(product: Product) {
    this.selectedProduct = this.productService.getProductById(product.id);
  }

  //BLOQUE PARA ELIMINAR UN PRODUCTO DEL CARRITO

  public deleteProductFromCart(id: string, product) {
    this.updateLocalCartwithProductDeleted(product);
    this.userService.updateUser(id, this.localCart);
    this.cart$.next(this.localCart);
  }

  private updateLocalCartwithProductDeleted(product: Product) {
    this.getLocalCartUpdatedWithProductDeleted(product);
    this.localCart = this.localCartUpdated;
  }

  private getLocalCartUpdatedWithProductDeleted(product: Product) {
    this.getUpdateProductToDelete(product);
    if (this.existingProductInTheCart.quantity > 1) {
      this.localCartUpdated = [...this.localCart];
      this.localCartUpdated[this.existingProductIndex] = this.updatedProduct;
    } else {
      this.localCartUpdated = [...this.localCart];
      this.localCartUpdated.splice(this.existingProductIndex, 1);
    }
  }

  private getUpdateProductToDelete(product: Product) {
    this.checkProductInCart(product);
    if (this.existingProductInTheCart.quantity > 1) {
      this.updatedProduct = { ...this.existingProductInTheCart };
      this.updatedProduct.quantity = this.updatedProduct.quantity - 1;
      this.updatedProduct.price =
        this.selectedProduct.price * this.updatedProduct.quantity;
    }
  }

  // BORRAR TODOS LOS PRODUCTOS DEL CARRITO
  removeAllProducts(id: string) {
    this.localCart = [];
    this.userService.updateUser(id, this.localCart);
    this.cart$.next(this.localCart);
  }
}
