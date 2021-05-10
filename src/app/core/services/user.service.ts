import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../../share/models/product.model';
import { ProductsService } from './products.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  cart$ = new BehaviorSubject<Product[]>([]);
  private cart: Product[] = [];

  constructor(
    private productService: ProductsService,
    private db: DataStorageService
  ) {}

  // METODO PARA OBTENER EL CARRITO DE UN USUARIO
  getUserCart(id: string) {
    this.db.getUser(id).subscribe((user) => {
      // console.log('aca');

      this.cart = user.cart;
      this.cart$.next(this.cart);
    });
  }

  // METODO PARA AGREGAR PRODUCTOS AL CARRITO DE UN USUARIO
  addProductToCart(id: string, product: Product) {
    // OBTENEMOS EL CARRITO DEL USUARIO
    const cart = this.cart;

    let cartUpdated;
    let updatedProduct;
    let quantity = 1;

    // OBTENEMOS LOS VALORES INICIALES DEL PRODUCTO
    let selectedProduct = this.productService.getProductById(product.id);

    // OBTENEMOS EL PRODUCTO A AGREGAR EN EL CARRITO SI EXISTE
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);
    const existingProduct = cart[existingProductIndex];

    // LOGICA PARA AGREGAR UN PRODUCTO EXISTENE
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.quantity = updatedProduct.quantity + 1;
      updatedProduct.price = selectedProduct.price * updatedProduct.quantity;
      cartUpdated = [...cart];
      cartUpdated[existingProductIndex] = updatedProduct;
      // LOGICA SI EL PRODUCTO NO EXISTE
    } else {
      product.quantity = quantity;
      updatedProduct = product;
      cartUpdated = [...cart, updatedProduct];
    }

    // SE ACTUALIZA EL CARRITO DEL USUARIO
    this.cart = cartUpdated;
    this.db.updateUser(id, this.cart);

    this.cart$.next(this.cart);
  }

  // METODO PARA ELIMINAR TODOS LOS PRODUCTOS DE EL CARRITO DE UN USUARIO
  deleteAllProducts(id: string) {
    //vaciamos carrito
    this.cart = [];
    // actualizamos userCart con el carrito
    this.db.updateUser(id, this.cart);
    this.cart$.next(this.cart);
  }

  // MATODO PARA ELIMINAR UN PRODUCTO DEL CARRITO DE UN USUARIO
  deleteProduct(id: string, product) {
    //OBTENER EL CARRITO DEL USUARIO
    const cart = this.cart;

    let cartUpdated;
    let updatedProduct;

    // OBTENEMOS LOS VALORES INICIALES DEL PRODUCTO
    let selectedProduct = this.productService.getProductById(product.id);
    // OBTENEMOS EL INDEX DEL CARRITO DEL USUARIO DONDE ESTA EL PRODUCTO
    const productIndex = cart.findIndex((p) => {
      return p.id === product.id;
    });

    const productToDelete = cart[productIndex];

    // LOGICA SI EXISTE MAS DE UN MISMO PRODUCTO
    if (productToDelete.quantity > 1) {
      updatedProduct = { ...productToDelete };
      updatedProduct.quantity = updatedProduct.quantity - 1;
      updatedProduct.price = selectedProduct.price * updatedProduct.quantity;

      cartUpdated = [...cart];
      cartUpdated[productIndex] = updatedProduct;
      //LOGICA SI SOLO EXISTE UN PRODUCTO DEL TIPO A ELIMINAR
    } else {
      cartUpdated = [...cart];
      cartUpdated.splice(productIndex, 1);
    }
    // SE ACTUALIZA CARRITO DEL USUARIO

    this.cart = cartUpdated;
    this.db.updateUser(id, this.cart);
    this.cart$.next(this.cart);
  }
}
