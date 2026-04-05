import {  Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";



@Injectable()
export class UsersRepository{
  constructor(
    @InjectRepository (Users) private usersRepository: Repository <Users>,
  ){}

  async getUsers(page: number, limit: number){
    const skip = (page -1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({password, ...filteredUserData})=> filteredUserData);
  }

  async getUserById(id: string){
    const user = await this.usersRepository.findOne({
      where: {id},
      relations: {
        orders: true,
      },
    });
    if (!user) throw new NotFoundException(`No se encontró el usuario con el id ${id}`);
    
    const { password, isAdmin, orders, ...userNoPassword } = user;
    const userOrderSummaries = orders.map(order => ({
      id: order.id,
      date: order.date,
    }));
    return {
      ...userNoPassword,
      orders: userOrderSummaries,
    };
  }

  async addUser(userDto: CreateUserDto){
    const newUser = await this.usersRepository.save(userDto);
    const dbUser = await this.usersRepository.findOneBy({id: newUser.id});

    if (!dbUser) throw new Error (`No se encontró el usuario con id ${newUser.id}`);
    const{password, isAdmin, ...userNoPassword}= dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: UpdateUserDto){
    await this.usersRepository.update (id, user);
    const updatedUser = await this.usersRepository.findOneBy({id});
    if (!updatedUser) { throw new NotFoundException(`No existe usuario con id ${id}`)};
  const {password, isAdmin, ...userNoPassword} = updatedUser;
    return userNoPassword;
  }

  async deleteUser(id:string){
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {throw new NotFoundException(`No existe usuario con id ${id}`)};
    await this.usersRepository.remove(user);
    const{password, isAdmin, ...userNoPassword}= user;
    return userNoPassword;
  }

 async getUserByEmail(email: string){
  return await this.usersRepository.findOne({
    where: { email },
    select: ['id', 'email', 'password', 'isAdmin']
  });
}
}




