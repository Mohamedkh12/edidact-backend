import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { Roles } from '../roles/decorators/roles.decorator';
import { CreateExerciseDto } from './dto/create-exercice.dto';
import { ExercisesService } from './exercises.service';
import { Role } from '../roles/enums/role.enum';


@Controller('exercises')
@UseGuards(JwtAuthGuards, RolesGuard)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get("getAllExercises")
  //@Roles(Role.Parent, Role.Admin)
  async getAllExercises() {
    return this.exercisesService.getAllExercises();
  }
  //@Roles(Role.Parent, Role.Admin)
  @Get(':id')
  async getExerciseById(@Param('id') id: number) {
    return this.exercisesService.getExerciseById(id);
  }

 // @Roles(Role.Admin)
  @Post("createExercise")
  async createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createExercise(createExerciseDto);
  }

 //@Roles(Role.Admin)
  @Put(':id')
  async updateExercise(@Param('id') id: number, @Body() updateExerciseDto: CreateExerciseDto) {
    return this.exercisesService.updateExercise(id, updateExerciseDto);
  }
 //@Roles(Role.Admin)
  @Delete(':id')
  async deleteExercise(@Param('id') id: number) {
    return this.exercisesService.deleteExercise(id);
  }}
