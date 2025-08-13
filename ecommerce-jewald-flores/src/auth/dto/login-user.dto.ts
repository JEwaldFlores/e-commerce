import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.com', format: 'email', maxLength:50})
  @IsEmail({}, { message: 'Debe ser un email válido' })
  @MaxLength(50)
  email: string;

  @ApiProperty({ example: 'P@ssw0rd1!', minLength: 8, maxLength:15})
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no debe superar 15 caracteres' })
  password: string;
}