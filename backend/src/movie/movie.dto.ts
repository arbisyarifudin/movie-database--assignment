import {
    IsEnum,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
} from 'class-validator';

enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export class PaginationQueryDto {
    @IsOptional()
    @IsNumberString({ no_symbols: true }, { message: 'page must be a number' })
    readonly page?: number;

    @IsOptional()
    @IsNumberString({ no_symbols: true }, { message: 'limit must be a number' })
    readonly limit?: number;

    @IsOptional()
    readonly sortBy?: string;

    @IsOptional()
    @IsEnum(SortDirection)
    readonly sortDir?: SortDirection;
}

export class CreateMovieDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly publishingYear: number;

    @IsOptional()
    readonly poster?: string;
}
