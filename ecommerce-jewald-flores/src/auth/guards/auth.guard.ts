import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import ENV from "config/environment";
import { Request } from "express";
import { Observable } from "rxjs";

// function validate(request: Request){
// const authHeader = request.headers['authorization'];
// if(!authHeader) return false;

// const auth= authHeader.split(' ')[1];
// if(!auth) return false;

// const [email, password] = auth.split(':');
// if(!email || !password) return false;

// return true;
// }

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private readonly jwtService: JwtService){}  
  canActivate(
        context: ExecutionContext): boolean | Promise<boolean> {
          const request= context.switchToHttp().getRequest();
          const token = request.headers.authorization?.split(' ')[1];
          if (!token){throw new UnauthorizedException (`No se ha enviado un token`)}
          try {
            const secret = ENV.JWT_SECRET;
            const payload = this.jwtService.verify(token, {secret});
            console.log(payload);

            //payload = datos del usar logueado
           payload.exp = new Date (payload.exp * 1000);
           request.user = payload;
           console.log(request.user)

           return true;  
          } catch (error) {
            throw new UnauthorizedException(`Error al validar token`);
          }
        }
}