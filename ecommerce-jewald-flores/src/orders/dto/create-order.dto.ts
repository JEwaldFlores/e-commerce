import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";


class ProductInOrderDto {
  @IsUUID()
  id: string;
}

export class CreateOrderDto{
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(()=>ProductInOrderDto)
    products: ProductInOrderDto[];
}
