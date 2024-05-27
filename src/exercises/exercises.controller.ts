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
import { Exercises } from './entities/exercises.entity';

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
  ) {
    return this.exercisesService.createExercise(createExerciseDto);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Admin')
  @Patch('updateExercise/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateExercise(
    @Param('id') id: number,
    @Body() updateExerciseDto: CreateExerciseDto,
  ) {
    return this.exercisesService.updateExercise(id, updateExerciseDto);
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
  ) {
    try {
      const exercisesByCategory =
        await this.exercisesService.getExercisesByCategory(category);
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
  @Roles('Admin')
  @Get('getAllClass')
  async getAllClass() {
    const Class = await this.exercisesService.getAllClasses()
    return Class;
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Admin')
  @Get('categories-by-class')
  async getCategoriesByClass() {
    const SubcategoriesByClass = await this.exercisesService.getCategoriesByClass();
    return SubcategoriesByClass;
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Admin')
  @Get('SubCategories-by-categories')
  async getSubCategoryByCategory() {
    const categoriesByClass = await this.exercisesService.getSubCategoryByCategory();
    return categoriesByClass;
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Admin')
  @Get('SubCategories-by-exercice')
  async getExercisesBySubCategory(
    @Query("classParam") classParam: string,
    @Query("category") category: string,
    @Query("subCategory") subCategory: string
  ) {
    const exercises = await this.exercisesService.getExercisesBySubCategory(classParam, category, subCategory);
    return exercises;
  }
  @Public()
  @Get('showExercice')
  async showExercice(): Promise<Exercises[]> {
    return await this.showExercice();
  }

  @Public()
  @Patch('changeExerciseStatus')
  async changeExerciseStatus(
    @Body('exerciseId') exerciseId: number,
    @Body('newStatus') newStatus: string,
  ): Promise<Exercises> {
    return await this.changeExerciseStatus(exerciseId, newStatus);
  }
}
