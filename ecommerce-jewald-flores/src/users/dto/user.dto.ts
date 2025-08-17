import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Matches,
  IsOptional,
  Validate,
  IsEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Debe ser un string entre 3 y 80 caracteres',
    example: 'Test User 01'
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no debe superar los 80 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Debe ser un email de formato válido',
    example: 'testuser01@test.com'
  })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  @IsEmail({}, { message: 'Debe ingresar un email válido.' })
  @MaxLength(50, { message: 'El email no debe superar los 50 caracteres.' })
  email: string;

  @ApiProperty({
    description: 'Debe contener una minúscula, una mayúscula y un caracter especial, entre 8 y 15 caracteres',
    example: 'aaaB33##'
  })
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

  @ApiProperty({
    description: 'Debe ser igual al password',
    example: 'aaaB33##'
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description: 'Debe tener entre 3 y 80 caracteres',
    example: 'Test street'
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'La dirección no debe superar los 80 caracteres.' })
  address?: string;

  @ApiProperty({
    description: 'Debe ser un número',
    example:'12345678'
  })
  @IsOptional()
  @IsNumber({}, { message: 'El teléfono debe ser un número.' })
  phone?: number;

  @ApiProperty({
    description: 'Debe tener entre 5 y 20 caracteres',
    example: 'Test country'
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'El país debe tener al menos 2 caracteres.' })
  @MaxLength(20, { message: 'El país no debe superar los 20 caracteres.' })
  country?: string;
  
  @ApiProperty({
    description: 'Debe tener entre 5 y 20 caracteres',
    example: 'Test city'
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'La ciudad debe tener al menos 2 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no debe superar los 20 caracteres.' })
  city?: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}



export class UpdateUserDto extends PartialType(CreateUserDto){}