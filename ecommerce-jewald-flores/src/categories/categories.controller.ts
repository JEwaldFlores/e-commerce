import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
    @ApiOperation({ summary: 'Listar categorías' })
    @ApiResponse({ status: 200, description:'OK'})
    getCategories(){
      return this.categoriesService.getCategories()
    }

  @Get('seeder')
    @ApiOperation({ summary: 'Cargar categorías (seeder)' })
    @ApiResponse({ status: 200, description: 'Seed ejecutado'})
    addCategories(){
     return this.categoriesService.addCategories()
  }

}
