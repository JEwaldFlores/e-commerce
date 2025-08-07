import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from './entities/products.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService){}
    @Get()
    getProducts(@Query('page') page: string, @Query('limit') limit: string) {
        if(page && limit)
        return this.productsService.getProducts(Number(page), Number(limit));
        return this.productsService.getProducts(Number(1), Number(5));
    }

  // GET /products/:id
  @Get(':id')
   getProduct(@Param('id', ParseUUIDPipe) id: string) {
     return this.productsService.getProduct(id);
   }

  // POST /products (crear un producto nuevo)
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
    createProduct(@Body() product: Products) {
     return this.productsService.createProduct(product);
    } 

  // PUT /products/:id (actualizar un producto)
  @Put(':id')
  @UseGuards(AuthGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Products) {
      return this.productsService.updateProduct(id, product);
    }

  // DELETE /products/:id (eliminar un producto)
  @Delete(':id')
  @UseGuards(AuthGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
      return this.productsService.deleteProduct(id);
    }

  // POST /products/seeder (cargar productos desde archivo)
  @Post('seeder')
  @UseGuards(AuthGuard) // Opcional: para proteger la carga
  @HttpCode(201)
    addProducts() {
     return this.productsService.addProducts();
    }
}
