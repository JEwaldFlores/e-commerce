import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "src/users/entities/users.entity";
import { OrderDetails } from "./ordersdetails.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({
    name: 'ORDERS',
})
export class Orders{
    @ApiProperty({
        description: 'uuid v4 generado por la BDD'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Fecha en formato dd/mm/yyy',
        example: '12/08/2025'
    })
    @Column()
    date: Date;

    @OneToOne(()=> OrderDetails, (orderDetails)=> orderDetails.order)
    orderDetails: OrderDetails;

    @ManyToOne(()=> Users, (user)=> user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users;
}