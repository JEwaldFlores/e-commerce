import { Products } from "src/products/entities/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({
    name: 'ORDERDETAILS',
})
export class OrderDetails{

    @ApiProperty({
      description: 'Identificador único del detalle de la orden (UUID)',
      example: '8e2b3b9a-4e77-4a7d-9a4e-1f0c8d2e3f4a'
    })
    @PrimaryGeneratedColumn ('uuid')
    id: string;

    @ApiProperty({
      description: 'Precio total del detalle (decimal con 2 decimales).',
      example: '1499.90'
    })
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }) 
    price: number;
    
    @OneToOne(() => Orders,(order) => order.orderDetails)
    @JoinColumn({ name: 'order_id'})
    order: Orders;

    @ManyToMany(() => Products)
    @JoinTable({
        name: 'ORDERDETAILS_PRODUCTS',
        joinColumn:{
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        },

    inverseJoinColumn:{
        name: 'product_id',
        referencedColumnName: 'id'
    }

   })
   products: Products[];
}
