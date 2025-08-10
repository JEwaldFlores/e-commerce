import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Get()
    getAuth(){
        return this.authService.getAuth();
    }
    //login
    @Post('signin')
    signIn(@Body()credentials:LoginUserDto){
        const {email,password}=credentials;
        return this.authService.signIn(email, password);
    }
    //registro
    @Post('signup')
    signUp(@Body() user: CreateUserDto){
        return this.authService.singUp(user);
    }
    
}
    


