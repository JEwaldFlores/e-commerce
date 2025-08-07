import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Debe ser un email válido' })
  @MaxLength(50)
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no debe superar 15 caracteres' })
  password: string;
}