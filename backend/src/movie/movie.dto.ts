import {
    IsArray,
    IsDateString,
    IsEnum,
    IsNumberString,
    IsOptional,
} from 'class-validator';

enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
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
