import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { Roles } from '../roles/decorators/roles.decorator';
import { CreateExerciseDto } from './dto/create-exercice.dto';
import { ExercisesService } from './exercises.service';
import { Role } from '../roles/enums/role.enum';


@Controller('exercises')

export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles("Parent", "Admin")
  @Get("getAllExercises")
  async getAllExercises() {
    return this.exercisesService.getAllExercises();
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles("Parent", "Admin")
  @Get(':id')
  async getExerciseById(@Param('id') id: number) {
    return this.exercisesService.getExerciseById(id);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles("Parent", "Admin")
  @Get("getExercisesByName/:name")
  async getExercisesByName(@Param('name') name: string){
  return this.exercisesService.getExercisesByName(name);
}
  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles("Admin")
  @Post("createExercise")
  async createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createExercise(createExerciseDto);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles("Admin")
  @Put(':id')
  async updateExercise(@Param('id') id: number, @Body() updateExerciseDto: CreateExerciseDto) {
    return this.exercisesService.updateExercise(id, updateExerciseDto);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles("Admin")
  @Delete(':id')
  async deleteExercise(@Param('id') id: number) {
    return this.exercisesService.deleteExercise(id);
  }}
