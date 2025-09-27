import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {} // dependency injection

    // register a new user
    async register(user: User) {
        // check if the user already exists
        const existing_user = await this.usersService.getUserByEmail(user.email);

        if (existing_user) {
            throw new BadRequestException('User already exists');
        }

        // hash the password
        const hashed_password = await bcrypt.hash(user.password, 10);
        user.password = hashed_password;

        // create the user
        return await this.usersService.createUser(user);
    }

    // sign in a user
    async signIn(user: User): Promise<any> {


        const existing_user = await this.usersService.getUserByEmail(user.email);

        // chekck if the user exists
        if (!existing_user){
            throw new BadRequestException('User Not Found')
        }

        if(!(await bcrypt.compare(user.password, existing_user.password))){
            throw new BadRequestException('Invalid Password')
        }

        const { password: _, ...user_data } = existing_user;
        return user_data;
    }
        
}
