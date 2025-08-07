import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/products.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json';
import { Categories } from "src/categories/entities/categories.entity";

@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository (Products)
    private productsRepository: Repository<Products>,
    @InjectRepository (Categories)
    private categoriesRepository: Repository<Categories>,
  ){}
  async getProducts (page: number, limit: number): Promise<Products[]> {
    let products= await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
   const start=(page-1)*limit;
   const end= start + limit;
   products = products.slice(start, end);
   return products;
  }

  async getProduct(id:string) {
    const product= await this.productsRepository.findOneBy({ id });
    if (!product) {throw new NotFoundException(`Producto con id ${id} no encontrado`)};

      return product;
  }

  async addProducts() {
    //Verificamos que exista la categoría:
    const categories= await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) =>{
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) {throw new NotFoundException(`La categoría ${element.category} no existe`)};

  //Creamos nuevo product y seteamos atributos:
      const product= new Products();
      product.name= element.name;
      product.description= element.description;
      product.price= element.price;
      product.stock= element.stock;
      product.category= category;
      
      //Guardamos el nuevo Producto en la Base de Datos:
      await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(product)
      //Si el producto existe, lo actualizamos:
      .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
      .execute();
      }),
    );
    return 'Productos agregados';
  }
    async updateProduct( id: string, product: Products){
      await this.productsRepository.update(id, product);
      const updatedProduct= await this.productsRepository.findOneBy({id});

      if (!updatedProduct) {throw new NotFoundException(`Producto con id ${id} no encontrado`)};

      return updatedProduct;
    }
      async deleteProduct(id: string) {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {throw new NotFoundException(`Producto con id ${id} no encontrado`)};

      await this.productsRepository.remove(product);
      return product;
    }
      async createProduct(product: Products): Promise<Products> {
      const newProduct = this.productsRepository.create(product);
      return await this.productsRepository.save(newProduct);
  }
}

