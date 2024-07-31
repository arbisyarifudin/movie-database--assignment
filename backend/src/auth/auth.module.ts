import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { envConfig } from 'src/config/env.config';
import { UserModule } from 'src/user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        MikroOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: envConfig.jwtSecret,
            // signOptions: { expiresIn: '1d' },
        }),
        UserModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
