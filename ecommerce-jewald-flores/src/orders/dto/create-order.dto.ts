import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";


class ProductInOrderDto {
  @ApiProperty({format:'uuid'})
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateOrderDto{
    @ApiProperty({format:'uuid'})
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
      type: ProductInOrderDto,
      isArray: true,
      example:[{id:'0b6c6b7e-2f2b-4a2d-b3a0-7d2d1b3f5d60'}],
    })

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(()=>ProductInOrderDto)
    products: ProductInOrderDto[];
}
