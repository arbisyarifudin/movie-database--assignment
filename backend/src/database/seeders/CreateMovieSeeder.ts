import { Seeder } from '@mikro-orm/seeder';
import { Movie } from '../../movie/movie.entity';
import { EntityManager } from '@mikro-orm/core';

export class CreateMovieSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        for (let i = 0; i < 20; i++) {
            const movie = new Movie();
            movie.title = `Movie ${i + 1}`;
            movie.publishingYear =
                Math.floor(Math.random() * (2021 - 1950 + 1)) + 1950;
            movie.poster = `/uploads/default-poster.jpg`;
            await em.persistAndFlush(movie);

            console.log(`Movie ${i + 1} has been seeded`);
        }
    }
}
