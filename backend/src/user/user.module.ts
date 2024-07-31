import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
})
export class UserModule {}
