import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    // get a user by id
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(parseInt(id));
    }
    
    // update a user
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
        return this.usersService.updateUser(parseInt(id), updateData);
    }

    // delete a user
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(parseInt(id));
    }
    
}
