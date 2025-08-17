import { ApiProperty } from "@nestjs/swagger";
import { Categories } from "src/categories/entities/categories.entity";
import { OrderDetails } from "src/orders/entities/ordersdetails.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'PRODUCTS',
})
export class Products{

    @ApiProperty({
        description: 'Identificador único del producto (UUID).',
        example: '7f2a0a64-6c9c-4d69-b1f3-1a0b9f2a3c4d',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ApiProperty({
        description: 'Nombre único del producto.',
        example: 'Audífonos Bluetooth X200',
    })
    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    name: string;

    @ApiProperty({
        description: 'Descripción detallada del producto.',
        example: 'Audífonos inalámbricos con cancelación de ruido y 30h de batería.'
    })
    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @ApiProperty({
        description: 'Precio del producto (decimal con 2 decimales).',
        example: '1299.99',
    })
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @ApiProperty({
        description: 'Unidades disponibles en inventario.',
        example: 150,
    })
    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    @ApiProperty({
        description: 'URL de la imagen del producto.',
    })
    @Column({
        type: 'text',
        default: 'https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
    })
    imgUrl: string;

    @ManyToOne(()=> Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Categories

    @ManyToMany(()=> OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];
}