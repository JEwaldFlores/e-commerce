import { Injectable, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json';
import { Products } from "./entities/products.entity";

@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository (Products)
    private productsRepository: Repository<Products>,
    @InjectRepository (Categories)
    private categoriesRepository: Repository<Categories>,
  ){}

  async getProducts (page:number, limit: number): Promise<Products[]>{
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProduct (id: string){
    const product = await this.productsRepository.findOneBy ({id});
    if (!product){
      return `Producto con id ${id} no encontrado`;
    }
    return product;
  }

  async addProducts(){
    //Verificamos que existe la categoria 
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async(element)=>{
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) throw new Error(`La categoria ${element.category}no existe`);

        //creamos nuevo product y seteamos atributos
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;
         
        // grabamos el nuevo producto en la base de datos
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          //si el producto existe, lo actualizamos
          .orUpdate (['description', 'price', 'imgUrl', 'stock'],['name'])
          .execute();
      }),
    );
      return 'Productos agregados';
  }
    async updateProduct (id: string, product: Products ){
      await this.productsRepository.update(id, product);
      const updatedProduct = await this.productsRepository.findOneBy({
        id
      });
      return updatedProduct;
    }


}


