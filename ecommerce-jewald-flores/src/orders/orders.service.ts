
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(private ordersRepository:OrdersRepository){}

    addOrder(order: CreateOrderDto) {
     return this.ordersRepository.addOrder(order);
    }

    getOrder(id:string){
        return this.ordersRepository.getOrder(id);
    }
}
