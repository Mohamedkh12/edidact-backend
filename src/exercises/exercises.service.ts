import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercises } from './entities/exercises.entity';
import { CreateExerciseDto } from './dto/create-exercice.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private readonly exercisesRepository: Repository<Exercises>,
  ) {}

  async getAllExercises(): Promise<Exercises[]> {
    return this.exercisesRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercises> {
    const exercise = await this.exercisesRepository.findOne({ where: { id} });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async createExercise(createExerciseDto: CreateExerciseDto): Promise<Exercises> {
    const exercise = this.exercisesRepository.create(createExerciseDto);

    return await this.exercisesRepository.save(exercise);
  }

  async updateExercise(id: number, updateExerciseDto: CreateExerciseDto): Promise<Exercises> {
    const exercise = await this.getExerciseById(id);

    // Update exercise properties
    exercise.category = updateExerciseDto.category;
    exercise.image = updateExerciseDto.image;
    exercise.name = updateExerciseDto.name;
    exercise.description = updateExerciseDto.description;
    exercise.assignment = updateExerciseDto.assignment;

    return this.exercisesRepository.save(exercise);
  }

  async deleteExercise(id: number){
    const exercise = await this.getExerciseById(id);
    if(!exercise) throw new NotFoundException()
    return await this.exercisesRepository.remove(exercise);
  }
}
