import { Injectable } from '@angular/core';

import { Product } from '../../share/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // array de productos
  Products: Product[] = [
    {
      id: '1',
      name: 'amarillo',
      price: 99.9,
      description: 'esto es del color amarillo',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '2',
      name: 'azul',
      price: 99.9,
      description: 'esto es del color azul',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '3',
      name: 'rojo',
      price: 99.9,
      description: 'esto es del color rojo',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '4',
      name: 'verde',
      price: 99.9,
      description: 'esto es del color verde',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '5',
      name: 'negro',
      price: 99.9,
      description: 'esto es del color negro',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '6',
      name: 'blanco',
      price: 99.9,
      description: 'esto es del color blanco',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '7',
      name: 'naranja',
      price: 99.9,
      description: 'esto es del color naranja',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '8',
      name: 'marron',
      price: 99.9,
      description: 'esto es del color marron',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '9',
      name: 'rosado',
      price: 99.9,
      description: 'esto es del color rosado',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
    {
      id: '10',
      name: 'celeste',
      price: 99.9,
      description: 'esto es del color celeste',
      image:
        'https://i.pinimg.com/474x/38/6b/9f/386b9ff268e018991a34edaa71aa14ef.jpg',
      available: true,
    },
  ];

  constructor() {}

  // metodo para obtener todos los productos
  getProducts() {
    return this.Products;
  }
}
