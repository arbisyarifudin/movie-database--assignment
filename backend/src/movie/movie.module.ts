import { Module } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig, multerOptions } from '../config/multer.config';
import { User } from 'src/user/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports: [
        MikroOrmModule.forFeature([Movie, User]),
        MulterModule.register({
            ...multerConfig,
            ...multerOptions,
        }),
    ],
    providers: [MovieService, JwtStrategy],
    controllers: [MovieController],
})
export class MovieModule {}
