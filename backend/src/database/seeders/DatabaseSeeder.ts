import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { InitialUserSeeder } from './InitialUserSeeder';
import { CreateMovieSeeder } from './CreateMovieSeeder';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        return this.call(em, [InitialUserSeeder, CreateMovieSeeder]);
    }
}
