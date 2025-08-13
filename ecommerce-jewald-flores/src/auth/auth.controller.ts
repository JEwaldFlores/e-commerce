import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    @ApiOperation({ summary: 'Estado del módulo de autenticación'})
    getAuth(){
        return this.authService.getAuth();
    }
    
    @Post('signin')
    @ApiOperation({ summary: 'Iniciar sesión (email/password)' })
    @ApiResponse({
        status: 201,
        description: 'Token emitido',
        schema: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Usuario logueado' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
    },
    })
    signIn(@Body()credentials:LoginUserDto){
        const {email,password}=credentials;
        return this.authService.signIn(email, password);
    }
   
    @Post('signup')
    @ApiOperation({ summary: 'Registrar usuario (con confirmación de password)' })
    @ApiResponse({ status: 201, description: 'Usuario creado (sin password)'})
    signUp(@Body() user: CreateUserDto){
        return this.authService.singUp(user);
    }
    
}
    


