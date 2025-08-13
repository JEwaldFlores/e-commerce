import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
       private readonly jwtService: JwtService,
    ){}

    getAuth(){
        return 'Autenticación';
    }
   
    async signIn(email:string, password:string){
        
        const foundUser = await this.usersService.getUserByEmail(email);
        if(!foundUser) throw new UnauthorizedException ('Credenciales incorrectas');

        
        const validPassword = await bcrypt.compare(password, foundUser.password);
        if(!validPassword) throw new UnauthorizedException ('Credenciales incorrectas'); 
         
     
        const payload = {id: foundUser.id, email: foundUser.email, isAdmin: foundUser.isAdmin};
        const token = this.jwtService.sign(payload);

        return{
            message: 'Usuario logueado',
            token,
        }
    }
    
    async singUp(user: CreateUserDto){
        const{ email, password}= user;
        
        if(!email || !password) throw new BadRequestException ('Se necesita email y password'); 
        const foundUser = await this.usersService.getUserByEmail(email);
        if(foundUser) throw new BadRequestException ('Email ya registrado');

        
        const hashedPassword = await bcrypt.hash(password,10);
        if(!hashedPassword)throw new BadRequestException ('Error al hashear el Password');

        return await this.usersService.addUser({ ...user, password: hashedPassword});
        
    }
}