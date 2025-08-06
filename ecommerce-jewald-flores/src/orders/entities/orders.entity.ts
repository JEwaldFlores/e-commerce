import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "../../entities/ordersdetails.entity";
import { Users } from "src/users/entities/users.entity";



@Entity({
    name: 'ORDERS',
})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @OneToOne(()=> OrderDetails, (orderDetails)=> orderDetails.order)
    orderDetails: OrderDetails;

    @ManyToOne(()=> Users, (user)=> user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users;
}