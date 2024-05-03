import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { Roles } from '../roles/decorators/roles.decorator';
import { CreateExerciseDto } from './dto/create-exercice.dto';
import { ExercisesService } from './exercises.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Public } from '../auth/decorators/public.decorator';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Admin')
  @Get('getAllExercises')
  async getAllExercises() {
    return this.exercisesService.getAllExercises();
  }
  /*
  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Admin')
  @Get(':id')
  async getExerciseById(@Param('id') id: number) {
    return this.exercisesService.getExerciseById(id);
  }*/

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Admin')
  @Get('getExercisesByName/:name')
  async getExercisesByName(@Param('name') name: string) {
    return this.exercisesService.getExercisesByName(name);
  }
  @Public()
  @Post('createExercise')
  @UseInterceptors(FileInterceptor('image'))
  async createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image,
  ) {
    return this.exercisesService.createExercise(createExerciseDto, image);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Admin')
  @Patch('updateExercise/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateExercise(
    @Param('id') id: number,
    @Body() updateExerciseDto: CreateExerciseDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image,
  ) {
    return this.exercisesService.updateExercise(id, updateExerciseDto, image);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Admin')
  @Delete('deleteExercise/:id')
  async deleteExercise(@Param('id') id: number) {
    return this.exercisesService.deleteExercise(id);
  }

  @Public()
  @Get('Categories')
  async findAllCategories(): Promise<{ categories: string[] }> {
    console.log('Inside findAllCategories method...');
    try {
      console.log('Fetching categories...');
      const categories = await this.exercisesService.findAllCategories();
      return { categories };
    } catch (error) {
      console.error('Error in findAllCategories:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Admin', 'Child')
  @UseInterceptors(FileInterceptor('image'))
  @Get('byCategory')
  async getExercisesByCategory(
    @Query('category') category: string,
    @UploadedFile() imageFile,
  ) {
    try {
      const exercisesByCategory =
        await this.exercisesService.getExercisesByCategory(category, imageFile);
      return exercisesByCategory;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Admin', 'Child')
  @Get('CountExercice')
  async getExerciseCountByCategory(@Query('category') category: string) {
    try {
      const exerciseCount =
        await this.exercisesService.getExerciseCountByCategory(category);
      return exerciseCount;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Admin', 'Child')
  @Get('classeCategory')
  async getCategoriesByClass(@Query('classe') classe: string): Promise<any> {
    return this.exercisesService.getCategoriesByClass(classe);
  }
}
