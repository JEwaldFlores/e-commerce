import { Injectable } from "@nestjs/common";



@Injectable()
export class UsersRepository{
    private users = [
        {
        id: 1,
        email: 'juan@example.com',
        name: 'Juan Pérez',
        password: '123456',
        address: 'Calle Falsa 123',
        phone: '123456789',
        country: 'México',
        city: 'CDMX',
        },
        {
        id: 2,
        email: 'ana@example.com',
        name: 'Ana Gómez',
        password: 'abcdef',
        address: 'Av. Siempre Viva 742',
        phone: '987654321',
        },
    ]
  async getUsers (){
    return this.users;
  }
}
