import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './models/User';
import { UsersService } from './users.service';

@ApiTags('users')
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

    @Get('user-and-content/:userID')
    getUserAndContent(@Param('userID') userID: number) {
        return this.usersService.getUserAndContent(userID);
    }
}
