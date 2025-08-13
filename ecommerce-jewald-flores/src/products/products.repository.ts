import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { Products } from './entities/products.entity';
import { Categories } from '../categories/entities/categories.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  
  async getProducts(page: number, limit: number): Promise<Products[]> {
    return this.productsRepository.find({
      relations: { category: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }


  async getProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return product;
  }

  
  async addProducts() {
    const categories = await this.categoriesRepository.find();

    await Promise.all(
      data.map(async (element) => {
        const category = categories.find((c) => c.name === element.category);
        if (!category) {
          throw new Error(`La categoría ${element.category} no existe`);
        }

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

       
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orIgnore() 
          .execute();
      }),
    );

    return 'Productos agregados (sin duplicar existentes)';
  }


  async createProduct(dto: CreateProductDto): Promise<Products> {
    const category = await this.categoriesRepository.findOneBy({ id: dto.categoryId });
    if (!category) {
      throw new NotFoundException(`Categoría con id ${dto.categoryId} no existe`);
    }

    const newProduct = this.productsRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
      category,
      ...(dto.imgUrl ? { imgUrl: dto.imgUrl } : {}),
    });

    return await this.productsRepository.save(newProduct);
  }


  async updateProduct(id: string, dto: UpdateProductDto) {
    let category: Categories | undefined;

    if (dto.categoryId) {
     
      const found = await this.categoriesRepository.findOneBy({ id: dto.categoryId }); 
      if (!found) {
        throw new NotFoundException(`Categoría con id ${dto.categoryId} no existe`);
      }
      category = found; 
    }

    await this.productsRepository.update(id, {
      ...dto,
      ...(category && { category }),
    });

    const updated = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!updated) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return updated;
  }

  
  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    await this.productsRepository.remove(product);
    return product;
  }
}

