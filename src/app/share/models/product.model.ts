export class Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  available: boolean;

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    available: boolean
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.available = available;
  }
}
