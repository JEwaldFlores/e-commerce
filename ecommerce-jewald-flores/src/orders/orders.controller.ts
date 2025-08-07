import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 @Post()
 addOrder(@Body() order: CreateOrderDto) {
  return this.ordersService.addOrder(order);
}

  @Get(':id')
  getOrder (@Param('id',ParseUUIDPipe)id:string){
    return this.ordersService.getOrder(id);
  }
}
