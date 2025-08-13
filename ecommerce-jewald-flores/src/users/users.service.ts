import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor (private readonly usersRepository: UsersRepository){}
    
    getUsers(page: number, limit: number){
        return this.usersRepository.getUsers(page,limit);
    }
    getUserById(id: string){
        return this.usersRepository.getUserById(id);
    }
    addUser(userDto: CreateUserDto){
        return this.usersRepository.addUser(userDto);
    }
    updateUser(id: string, user: UpdateUserDto){
        return this.usersRepository.updateUser(id, user);
    }
    deleteUser(id: string){
        return this.usersRepository.deleteUser(id);
    }

    async getUserByEmail(email:string){
        return this.usersRepository.getUserByEmail(email);
    }
}
