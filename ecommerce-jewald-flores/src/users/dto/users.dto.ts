import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Matches,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no debe superar los 80 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  @IsEmail({}, { message: 'Debe ingresar un email válido.' })
  @MaxLength(50, { message: 'El email no debe superar los 50 caracteres.' })
  email: string;

  @IsNotEmpty({ message: 'El password no puede estar vacío.' })
  @MinLength(8, { message: 'El password debe tener al menos 8 caracteres.' })
  @MaxLength(15, { message: 'El password no debe superar los 15 caracteres.' })
  @Matches(/.[a-z]./, { message: 'Debe incluir al menos una letra minúscula.' })
  @Matches(/.[A-Z]./, { message: 'Debe incluir al menos una letra mayúscula.' })
  @Matches(/.\d./, { message: 'Debe incluir al menos un número.' })
  @Matches(/.[!@#$%^&()\[\]{}\-_.+=].*/, {
    message: 'Debe incluir al menos un carácter especial.',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'La dirección no debe superar los 80 caracteres.' })
  address?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El teléfono debe ser un número.' })
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El país debe tener al menos 2 caracteres.' })
  @MaxLength(20, { message: 'El país no debe superar los 20 caracteres.' })
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'La ciudad debe tener al menos 2 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no debe superar los 20 caracteres.' })
  city?: string;

  @IsOptional()
  isAdmin?: boolean;
}



export class UpdateUserDto extends PartialType(CreateUserDto){}