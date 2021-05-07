import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../share/models/user.model';
import { Product } from '../../share/models/product.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  cart$ = new BehaviorSubject<Product[]>([]);
  private cart: Product[];
  private users: User[] = [
    new User('cehchino33@gmail.com', 'fPirv7O1JCQB6lz8nFGmVoqzN2q2', []),
    new User(
      'hernandez1989carlos@gmail.com',
      'vxbBv9PZRBh93zgIwgKhtSJL6tv2',
      []
    ),
  ];
  constructor(private productService: ProductsService) {}

  // METODO PARA OBTENER EL CARRITO DE UN USUARIO
  getCart(id: string) {
    const user = this.users.find((user) => {
      return user.id === id;
    });
    this.cart = user.cart;
    this.cart$.next(this.cart);
  }

  // METODO PARA AGREGAR PRODUCTOS AL CARRITO DE UN USUARIO
  addProductToCart(id: string, product: Product) {
    // OBTENEMOS EL CARRITO DEL USUARIO
    const user = this.users.find((user) => user.id === id);
    const cart = user.cart;

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
    this.users.find((user) => user.id === id).cart = cartUpdated;

    this.cart = cartUpdated;
    this.cart$.next(this.cart);
  }

  // METODO PARA ELIMINAR TODOS LOS PRODUCTOS DE EL CARRITO DE UN USUARIO
  deleteAllProducts(id: string) {
    this.users.find((user) => user.id === id).cart = [];
    this.cart = [];
    this.cart$.next(this.cart);
  }

  // MATODO PARA ELIMINAR UN PRODUCTO DEL CARRITO DE UN USUARIO
  deleteProduct(id: string, product) {
    //OBTENER EL CARRITO DEL USUARIO
    const user = this.users.find((user) => {
      return user.id === id;
    });
    const cart = user.cart;

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
    } else {
      cartUpdated = [...cart];
      cartUpdated.splice(productIndex, 1);
    }
    // SE ACTUALIZA CARRITO DEL USUARIO
    this.users.find((user) => user.id === id).cart = cartUpdated;
    this.cart = cartUpdated;
    this.cart$.next(this.cart);
  }
}
