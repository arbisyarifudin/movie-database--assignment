import {
    IsEnum,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
} from 'class-validator';

enum SortDirectionEnum {
    ASC = 'asc',
    DESC = 'desc',
}

enum sortByEnum {
    title = 'title',
    publishingYear = 'publishingYear',
    createdAt = 'createdAt',
}

export class PaginationQueryDto {
    @IsOptional()
    @IsNumberString({ no_symbols: true }, { message: 'page must be a number' })
    readonly page?: number;

    @IsOptional()
    @IsNumberString({ no_symbols: true }, { message: 'limit must be a number' })
    readonly limit?: number;

    @IsOptional()
    @IsEnum(sortByEnum)
    readonly sortBy?: sortByEnum;

    @IsOptional()
    @IsEnum(SortDirectionEnum)
    readonly sortDir?: SortDirectionEnum;
}

export class CreateMovieDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly publishingYear: number;

    @IsOptional()
    readonly poster?: string;
}
