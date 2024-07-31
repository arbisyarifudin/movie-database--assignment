import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
        AuthModule,
        UserModule,
        MovieModule,
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {}
