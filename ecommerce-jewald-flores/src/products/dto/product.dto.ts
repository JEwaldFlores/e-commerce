import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}