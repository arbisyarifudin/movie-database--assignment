import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { LoginDto } from './auth.dto';
import { logMessage } from 'src/shared/utils';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: EntityRepository<User>,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(data: LoginDto) {
        const user = await this.validateUser(data.email, data.password);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, sub: user.id };

        let jwtToken = null;

        // Check if rememberMe is true
        if (data.rememberMe) {
            // Set expire token to 7 days
            jwtToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        } else {
            // Else set to 1 day
            jwtToken = this.jwtService.sign(payload, { expiresIn: '1d' });
        }

        return {
            message: 'Success',
            data: {
                user,
                access_token: jwtToken,
            },
        };
    }

    async register(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        this.usersRepository.insert({
            email,
            password: hashedPassword,
        });
        return this.usersRepository.findOne({ email });
    }
}
