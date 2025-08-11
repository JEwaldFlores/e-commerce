import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../roles.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor (private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
      context.getHandler(),
      context.getClass(),
    ]); //roles permitidos ['admin','superadmin']

    const request = context.switchToHttp().getRequest();
     // request.user.roles=['admin', 'tester']

    const hasRole = () => requiredRoles.some((role) => request.user?.roles?.includes(role));
    const valid = request.user && request.user.roles && hasRole();
    
    if(!valid){ throw new ForbiddenException('No tiene permisos para acceder a esta ruta')}

    return true;
  }
}
