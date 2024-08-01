import { Seeder } from '@mikro-orm/seeder';
import { Movie } from '../../movie/movie.entity';
import { EntityManager } from '@mikro-orm/core';

export class CreateMovieSeeder extends Seeder {
    private static readonly MIN_MOVIES = 20;
    private static readonly MIN_YEAR = 1950;
    private static readonly MAX_YEAR = 2021;
    private static readonly DEFAULT_POSTER = '/uploads/default-poster.jpg';

    async run(em: EntityManager): Promise<void> {
        const totalMovies = await em.count(Movie);
        const moviesToCreate = Math.max(
            CreateMovieSeeder.MIN_MOVIES - totalMovies,
            0,
        );

        for (let i = 0; i < moviesToCreate; i++) {
            const movie = new Movie();
            movie.title = `Movie ${i + 1}`;
            movie.publishingYear = this.getRandomYear();
            movie.poster = CreateMovieSeeder.DEFAULT_POSTER;
            await em.persistAndFlush(movie);

            console.log(`Movie ${i + 1} has been seeded`);
        }
    }

    private getRandomYear(): number {
        return (
            Math.floor(
                Math.random() *
                    (CreateMovieSeeder.MAX_YEAR -
                        CreateMovieSeeder.MIN_YEAR +
                        1),
            ) + CreateMovieSeeder.MIN_YEAR
        );
    }
}
