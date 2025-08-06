import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService){}
    @Get()
    getProducts(@Query('page') page: string, @Query('limit') limit: string) {
            if(page && limit)
            return this.productsService.getProducts(Number(page), Number(limit));
            return this.productsService.getProducts(Number(1), Number(5));
    }

   @Get('seeder')
    addProducts(){
        return this.productsService.addProducts();
    }

//    @Get(':id')
//     getProduct(@Param('id') id: string) {
//         return this.productsService.getProductById(id);
//     }
//     @HttpCode(201)
//     @Post()
//     @UseGuards(AuthGuard)
//     addProduct(@Body() product: any) {
//         const id = this.productsService.addProduct();    //*CAMBIO AQUIII
//         return {id};
//     }    
        
//     @Put(':id')
//     @UseGuards(AuthGuard)
//     updateProduct(@Param('id') id: string, @Body() product: any) {
//         return this.productsService.updateProduct(id, product);
//     }

//     @Delete(':id')
//     @UseGuards(AuthGuard)
//     deleteProduct(@Param('id') id: string)  {
//         return this.productsService.deleteProduct(id);
//     }
}
