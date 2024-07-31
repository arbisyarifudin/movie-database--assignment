import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Request,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post()
    @UseInterceptors(FileInterceptor('posterFile'))
    async create(
        @Body() createMovieDto: any,
        @UploadedFile() file: Express.Multer.File,
        @Request() req: any,
    ) {
        const posterUrl = file ? `/uploads/${file.filename}` : null;
        return this.movieService.create({
            ...createMovieDto,
            poster: posterUrl,
            user: req.user,
        });
    }

    @Get()
    findAll() {
        return this.movieService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.movieService.findOne(id);
    }

    @Put(':id')
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
