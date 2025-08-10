import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 @Post()
@UseGuards(AuthGuard)
 addOrder(@Body() order: CreateOrderDto) {
  return this.ordersService.addOrder(order);
}

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder (@Param('id',ParseUUIDPipe)id:string){
    return this.ordersService.getOrder(id);
  }
}
