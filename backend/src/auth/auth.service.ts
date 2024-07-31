import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

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

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, sub: user.id };
        return {
            message: 'Success',
            data: {
                user,
                access_token: this.jwtService.sign(payload),
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
