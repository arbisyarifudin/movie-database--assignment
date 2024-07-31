import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';

export class InitialUserSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const checkUser = await em.findOne(User, { email: 'user@example.com' });
        if (!checkUser) {
            const user = new User();
            user.email = 'user@example.com';
            user.password = bcrypt.hashSync('password', 10);
            await em.persistAndFlush(user);
        }

        console.log('Initial user have been seeded');
    }
}
