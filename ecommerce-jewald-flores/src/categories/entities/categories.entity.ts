import { ApiProperty } from "@nestjs/swagger";
import { Products } from "src/products/entities/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({
    name: 'CATEGORIES',
})
export class Categories{

    @ApiProperty({
        description: 'Identificador único de la categoría (UUID).',
        example: '6a9f1a6b-2c1d-4b0a-9f7e-3f2b1c4d5e6f',
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        description: 'Nombre único de la categoría.',
        example: 'Electrónica',
    })
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

    @OneToMany(()=> Products, (product) => product.category)
    products: Products [];
}