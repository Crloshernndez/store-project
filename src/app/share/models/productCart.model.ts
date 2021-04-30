export class ProductCart {
  id: string;
  image: string;
  name: string;
  quantity: number;
  price: number;

  constructor(
    id: string,
    image: string,
    name: string,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}
