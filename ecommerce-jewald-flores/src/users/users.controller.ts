import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('users')
export class UsersController {
    constructor (private readonly usersService:UsersService){}

     //**GET TODOS localhost/users */
    @Get()
    @UseGuards(AuthGuard)
    getUsers(@Query('page') page:string, @Query('limit') limit: string) {
        if(page && limit)
        return this.usersService.getUsers(Number(page), Number(limit));

        return this.usersService.getUsers(1, 5);
    }
    //**GET localhost/users/:id  */
    @Get(':id')
    @UseGuards(AuthGuard)
    getUser(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }
    //**POST localhost/users  */
    @HttpCode(201)
    @Post()
    addUser(@Body() user: any) {
        return this.usersService.addUser(user);
    }
    //** PUT localhost/users/:id  */
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: any) {
        return this.usersService.updateUser(id, user);
    }
    //** DELETE localhost/users/:id  */
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string)  {
        return this.usersService.deleteUser(id);
    }
}
