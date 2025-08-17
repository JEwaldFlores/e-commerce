import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsUUID,
  IsUrl,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({maxLength: 50, example: 'Logitech G502'})
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Gaming mouse'})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 39.99})
  @Type(()=> Number)
  @IsNumber({maxDecimalPlaces: 2})
  @Min(0)
  price: number;

  @ApiProperty({ example: 12})
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'https://example.com/image.jpg'})
  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @ApiProperty({ format: 'uuid'})
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ maxLength: 50})
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 49.99})
  @IsOptional()
  @Type(() => Number)
  @IsNumber({maxDecimalPlaces: 2})
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 8})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @ApiPropertyOptional({ format: 'uuid'})
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}