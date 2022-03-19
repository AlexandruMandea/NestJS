import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './models/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserByID(@Param('id') id: number): User {
        return this.usersService.getUserByID(id);
    }

    @Post()
    createUser(@Body() body: CreateUserDTO) {
        return this.usersService.createUser(body);
    }

    @Patch(':id')
    editUser(@Param('id') id: number, @Body() body: CreateUserDTO) {
        return this.usersService.editUser(id, body);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
}