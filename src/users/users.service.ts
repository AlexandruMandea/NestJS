import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './models/User';

@Injectable()
export class UsersService {
    private users: User[] = [
        new User(1, 'alex.m', 22, '0758'),
        new User(2, 'andrei.m', 24, '0756'),
        new User(3, 'vladimir.c', 22, '07'),
        new User(4, 'radu.a', 20, '07**'),
        new User(5, 'alina.d', 21, '07**'),
        new User(6, 'viorica.s', 25, '07**'),
        new User(7, 'mihai', 27, '07**'),
        new User(8, 'george', 21, '07**'),
        new User(9, 'grigore', 23, '07**'),
    ];

    private getBiggestUserID() {
        let biggestID: number = 0;

        this.users.forEach(user => {
            if(biggestID < user._id) {
                biggestID = user._id;
            }
        })

        return biggestID;
    }

    getAllUsers() {
        return [...this.users];
    }

    getUserByID(id: number): User {
        let user: User =  this.users.find((user) => {
            return user._id === parseInt(id.toString());
        });

        return new User(user._id, user.name, user.age, user.phoneNumber);
    }

    createUser(body: CreateUserDTO) {
        let user: User;
        let _id = this.getBiggestUserID() + 1;

        user = new User(_id, body.name, body.age, body.phoneNumber);

        this.users.push(user);
    }
    
    editUser(id: number, body: CreateUserDTO) {
        this.users.forEach(user => {
            if(user._id === parseInt(id.toString())) {
                user.name = body.name;
                user.age = body.age;
                user.phoneNumber = body.phoneNumber;
            }
        });
    }
    
    deleteUser(id: number) {
        let user: User =  this.users.find((user) => {
            return user._id === id;
        });

        let index = this.users.indexOf(user);

        this.users.splice(index, 1);
    }
}
