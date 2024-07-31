import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Query,
    UsePipes,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreateMovieDto, PaginationQueryDto } from './movie.dto';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('posterFile'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createMovieDto: CreateMovieDto,
    ) {
        return this.movieService.create({
            ...createMovieDto,
            poster: file ? `/uploads/${file.filename}` : createMovieDto.poster,
        });
    }

    @Get()
    async findAll(@Query() query: PaginationQueryDto) {
        return this.movieService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.movieService.findOne(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('posterFile'))
    async update(
        @Param('id') id: string,
        @Body() updateMovieDto: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const posterUrl = file
            ? `/uploads/${file.filename}`
            : updateMovieDto.poster;
        return this.movieService.update(id, {
            ...updateMovieDto,
            poster: posterUrl,
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.movieService.remove(id);
    }
}
