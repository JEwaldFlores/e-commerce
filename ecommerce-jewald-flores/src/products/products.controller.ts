import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService){}
    @Get()
    getProducts(@Query('page') page: string, @Query('limit') limit: string) {
        if(page && limit)
        return this.productsService.getProducts(Number(page), Number(limit));
        return this.productsService.getProducts(Number(1), Number(5));
    }

  
  @Get(':id')
   getProduct(@Param('id', ParseUUIDPipe) id: string) {
     return this.productsService.getProduct(id);
   }


  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
    createProduct(@Body() dto: CreateProductDto) {
     return this.productsService.createProduct(dto);
    } 

 
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProductDto) {
      return this.productsService.updateProduct(id, dto);
    }

  @Delete(':id')
  @UseGuards(AuthGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
      return this.productsService.deleteProduct(id);
    }


  @Post('seeder')
  @UseGuards(AuthGuard) 
  @HttpCode(201)
    addProducts() {
     return this.productsService.addProducts();
    }
}
