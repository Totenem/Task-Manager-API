import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {

    // crete a user- for the registration
    async createUser(user: User) {
        return await prisma.user.create({
            data: user
        })
    }

    // get a user by id
    async getUserById(id: User['id']) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        
        // check if user exist to not get "null" values for the user_data. Also throw an error if user don't exist
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const user_data = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        }

        return user_data;
    }

    // get a user by email
    async getUserByEmail(email: User['email']) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    // update a user
    async updateUser(id: User['id'], updateData: UpdateUserDto) {
        // Only allow updating email field - filter out everything else
        const allowedUpdates: Partial<Pick<User, 'email'>> = {};
        
        if (updateData.email) {
            allowedUpdates.email = updateData.email;
        }
        
        const user = await prisma.user.update({
            where: { id },
            data: allowedUpdates
        })

        const user_data = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        }

        return user_data
    }

    // delete a user
    async deleteUser(id: User['id']) {
        return await prisma.user.delete({
            where: { id }
        })
    }
}
