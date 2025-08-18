import { ApiProperty } from "@nestjs/swagger";
import { Orders } from "src/orders/entities/orders.entity";
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'USERS',
})
export class Users{

    @ApiProperty({
        description: 'Identificador único del usuario (UUID).',
        example: 'b8d9d2d1-3e4a-4c55-9e1a-8d2f6c9a1b23'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Debe ser un string de máximo 80 caracteres',
        example: 'Test User 01'
    })
    @Column({
        type: 'varchar',
        length: 80,
        nullable: false,
    })
    name: string; 

    @ApiProperty({
        description: 'Debe ser un email de formato válido',
        example: 'testuser01@test.com'
    })
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @ApiProperty({
        description: 'Debe contener una minúscula, una mayúscula y un caracter especial, entre 8 y 15 caracteres',
        example: 'aaaB33##'
    })
    @Column({
        type: 'varchar',
        length: 60, 
        nullable: false,
    })
    password: string;

    @ApiProperty({
        description: 'Debe ser un número',
        example:'12345678'
    })
    @Column({
        type: 'int',
        nullable: true,
    })
    phone?: number;

    @ApiProperty({
        description: 'Debe tener entre 5 y 20 caracteres',
        example: 'Test country' 
    })
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    country?: string;

    @ApiProperty({
        description: 'Debe tener entre 3 y 80 caracteres',
        example: 'Test street'
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    address?: string;

    @ApiProperty({
        description: 'Debe tener entre 5 y 20 caracteres',
        example: 'Test city'
    })
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    city?: string;

    @Column({
        default: false,
    })
    isAdmin: boolean;
    

        @OneToMany(()=> Orders, (order)=> order.user)
        orders: Orders[];
}

