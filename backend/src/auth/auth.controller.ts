import {
    Controller,
    Request,
    Post,
    UseGuards,
    Body,
    UsePipes,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout() {
        return { message: 'Logout successful' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Request() req) {
        return {
            message: 'Success',
            data: req.user,
        };
    }
}
