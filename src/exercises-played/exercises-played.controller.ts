import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ExercisesPlayedService } from './exercises-played.service';
import { CreateExercisesPlayedDto } from './dto/create-exercises-played.dto';
import { UpdateExercisesPlayedDto } from './dto/update-exercises-played.dto';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('exercises-played')
export class ExercisesPlayedController {
 /* constructor(private readonly exercisesPlayedService: ExercisesPlayedService) {}

  @Post()
  create(@Body() createExercisesPlayedDto: CreateExercisesPlayedDto) {
    return this.exercisesPlayedService.create(createExercisesPlayedDto);
  }

  //@UseGuards(JwtAuthGuards, RolesGuard)
  //@Roles('Parent')
  @Public()
  @Get('getAllExercisesPlayed/:idChild')
  findAll(@Param('idChild', ParseIntPipe) idChild: number) {
    return this.exercisesPlayedService.findAll(idChild);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesPlayedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExercisesPlayedDto: UpdateExercisesPlayedDto) {
    return this.exercisesPlayedService.update(+id, updateExercisesPlayedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesPlayedService.remove(+id);
  }*/
}
