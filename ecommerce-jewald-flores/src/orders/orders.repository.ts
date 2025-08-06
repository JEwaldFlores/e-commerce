import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/orders/entities/orders.entity";
import { OrderDetails } from "src/entities/ordersdetails.entity";
import { Products } from "src/products/entities/products.entity";
import { Users } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository (Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository (OrderDetails)
        private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository (Users)
        private usersRepository: Repository <Users>,
        @InjectRepository (Products)
        private productsRepository: Repository <Products>,
    ){}

    async addOrder (userId: string, products: any){
        let total= 0

        //vefirificamos que exista el usuario
        const user = await this.usersRepository.findOneBy({id: userId})
        if(!user){
            return `Usuario con id ${userId} no encontrado`;
        }

        //creamos la orden
        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        //asociamos cada id recibido con el producto 
        const productsArray= await Promise.all(
        products.map(async (element) => {
        const product= await this.productsRepository.findOneBy({
         id: element.id,
        });
        if(!product){
            return `Producto con id ${element.id} no encontrado`;
        }
        //Calcula el Monto total;
        total+= Number(product.price);
        //Actualizar stock
        await this.productsRepository.update(
            {id: element.id},
            {stock: product.stock - 1},
        );
        return product;
            }),
        );
        //Crear "OrderDetail" e insertar en BBDD
        const orderDetail= new OrderDetails();
        
        orderDetail.price= Number(Number(total).toFixed(2));
        orderDetail.products= productsArray;
        orderDetail.order= newOrder;
        await this.orderDetailRepository.save(orderDetail);

        //Enviar al cliente la compra con la info de productos
        return await this.ordersRepository.find({
            where: {id: newOrder.id},
            relations:{
                orderDetails:true,
            },
        });
        }

        async getOrder(id:string){
        const order= this.ordersRepository.findOne({
            where: { id },
            relations:{
                orderDetails:{
                    products:true,
                },
            },
        });
        if(!order){
            return `Orden con id ${id} no encontrada`;
        }
        return order;
   }
}

    
    
