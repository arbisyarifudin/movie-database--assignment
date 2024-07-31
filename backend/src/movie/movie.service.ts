import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { PaginationQueryDto } from './movie.dto';

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

    async findAll(query: PaginationQueryDto) {
        const page = Number(query.page || 1);
        const limit = Number(query.limit || 10);

        const sortBy = query.sortBy || 'created_at';
        const sortDir = query.sortDir || 'ASC';

        const items = await this.moviesRepository.find(
            {},
            {
                limit,
                offset: (page - 1) * limit,
                orderBy: { [sortBy]: sortDir.toUpperCase() },
            },
        );

        const total = await this.moviesRepository.count();

        return {
            message: 'Movies retrieved successfully',
            data: items,
            meta: {
                page,
                limit,
                total,
            },
        };
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
