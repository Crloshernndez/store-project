export class Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  description?: string;
  available?: boolean;

  constructor(
    id: string,
    name: string,
    price: number,
    image: string,
    quantity?: number,
    description?: string,
    available?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
    this.description = description;
    this.available = available;
  }
}
