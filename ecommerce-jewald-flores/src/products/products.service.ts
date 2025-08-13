import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor (private readonly productsRepository:ProductsRepository){}
   
    getProducts(page: number, limit: number){
        return this.productsRepository.getProducts(page,limit);
    }

    getProduct(id: string) {
        return this.productsRepository.getProduct(id);
    }

    createProduct(dto: CreateProductDto) {
     return this.productsRepository.createProduct(dto);
    }

    updateProduct(id: string, dto: UpdateProductDto) {
        return this.productsRepository.updateProduct(id, dto);
    }

    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id);
    }

    addProducts() {
      return this.productsRepository.addProducts();
    }
}
