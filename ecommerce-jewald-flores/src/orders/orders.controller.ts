import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

@Post()
@UseGuards(AuthGuard)
@ApiBearerAuth()
    @ApiOperation({ summary: 'Crear orden de compra' })
    @ApiResponse({ status: 201, description: 'Orden creada'})
 addOrder(@Body() order: CreateOrderDto) {
  return this.ordersService.addOrder(order);
}


  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener orden por ID (con detalle)' })
    @ApiParam({ name: 'id', format: 'uuid' })
    @ApiResponse({ status: 200, description:'OK'})
  getOrder (@Param('id',ParseUUIDPipe)id:string){
    return this.ordersService.getOrder(id);
  }
}
