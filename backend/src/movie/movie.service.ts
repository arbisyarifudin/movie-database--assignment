import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { CreateMovieDto, PaginationQueryDto } from './movie.dto';
import { logMessage } from 'src/shared/utils';
@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: EntityRepository<Movie>,
    ) {}

    create(movie: CreateMovieDto) {
        const newMovie = this.moviesRepository.create(movie);
        this.moviesRepository.getEntityManager().persistAndFlush(newMovie);
        return {
            message: 'Movie created successfully',
            data: newMovie,
        };
    }

    async findAll(query: PaginationQueryDto) {
        const page = Number(query.page || 1);
        const limit = Number(query.limit || 10);

        const sortBy = query.sortBy || 'createdAt';
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

    async findOne(id: string) {
        return {
            message: 'Movie retrieved successfully',
            data: await this.moviesRepository.findOne({ id }),
        };
    }

    async update(id: string, movie: Partial<Movie>) {
        const findMovie = await this.moviesRepository.findOne({ id });
        if (!findMovie) {
            return {
                message: 'Movie not found',
            };
        }

        if (!movie.poster) {
            movie.poster = findMovie.poster;
        } else {
            // Check if new poster is different from the old poster, and delete the old one
            if (movie.poster !== findMovie.poster) {
                const oldPosterPath = path.join(
                    'src/',
                    '../',
                    findMovie.poster,
                );
                logMessage('oldPosterPath', oldPosterPath);
                fs.unlink(oldPosterPath, (err) => {
                    if (err) {
                        logMessage('Failed to delete old poster:', err);
                    } else {
                        logMessage('Old poster deleted successfully');
                    }
                });
            }
        }

        this.moviesRepository.assign(findMovie, movie);
        this.moviesRepository.getEntityManager().persistAndFlush(findMovie);

        return {
            message: 'Movie updated successfully',
            data: findMovie,
        };
    }

    remove(id: string) {
        const movie = this.moviesRepository.findOne({ id });
        if (!movie) {
            return {
                message: 'Movie not found',
            };
        }

        this.moviesRepository.nativeDelete({ id });
        return {
            message: 'Movie deleted successfully',
        };
    }
}
