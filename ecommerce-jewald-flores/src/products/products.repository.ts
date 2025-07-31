import { Injectable } from "@nestjs/common";



@Injectable()
export class ProductsRepository{
  private products = [
        {
        id: 1,
        name: 'Laptop Dell',
        description: 'Laptop con 16GB RAM',
        price: 1500,
        stock: true,
        imgUrl: 'https://example.com/laptop.jpg',
        },
        {
        id: 2,
        name: 'Mouse Logitech',
        description: 'Mouse inalámbrico',
        price: 25,
        stock: false,
        imgUrl: 'https://example.com/mouse.jpg',
        },
    ] 
  async getProducts (){
    return this.products;
  }
}