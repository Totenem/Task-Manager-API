import { Body, Controller, Post } from '@nestjs/common';
import type { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() user: User) {
        return this.authService.register(user);
    }

    @Post('signin')
    async signIn(@Body() user: User) {
        return this.authService.signIn(user);
    }
}
