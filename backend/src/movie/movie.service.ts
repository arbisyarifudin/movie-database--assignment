import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: EntityRepository<Movie>,
    ) {}

    create(movie: Partial<Movie>) {
        const newMovie = this.moviesRepository.create(movie);
        return this.moviesRepository.insert(newMovie);
    }

    findAll() {
        return this.moviesRepository.findAll();
    }

    findOne(id: string) {
        return this.moviesRepository.findOne({ id });
    }

    update(id: string, movie: Partial<Movie>) {
        return this.moviesRepository.nativeUpdate({ id }, movie);
    }

    remove(id: string) {
        return this.moviesRepository.nativeDelete({ id });
    }
}
