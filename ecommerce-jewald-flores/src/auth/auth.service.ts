import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
       private readonly jwtService: JwtService,
    ){}

    getAuth(){
        return 'Autenticación';
    }
    //login
    async signIn(email:string, password:string){
        //verificamos que exista 
        const foundUser = await this.usersService.getUserByEmail(email);
        if(!foundUser) throw new BadRequestException ('Credenciales incorrectas');

        //validar la contraseña con hash
        const validPassword = await bcrypt.compare(password, foundUser.password);
        if(!validPassword) throw new BadRequestException ('Credenciales incorrectas'); 
         
        //Generar token 
        const payload = {id: foundUser.id, email: foundUser.email, isAdmin: foundUser.isAdmin};
        const token = this.jwtService.sign(payload);

        return{
            message: 'Usuario logueado',
            token,
        }
    }
    //registro
    async singUp(user: CreateUserDto){
        const{ email, password}= user;
        //verficar que no exista
        if(!email || !password) throw new BadRequestException ('Se necesita email y password'); 
        const foundUser = await this.usersService.getUserByEmail(email);
        if(foundUser) throw new BadRequestException ('Email ya registrado');

        //Hashear contrasena 
        const hashedPassword = await bcrypt.hash(password,10);
        if(!hashedPassword)throw new BadRequestException ('Error al hashear el Password');

        return await this.usersService.addUser({ ...user, password: hashedPassword});
        
    }
}