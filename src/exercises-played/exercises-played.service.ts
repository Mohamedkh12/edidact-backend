import { Injectable } from '@nestjs/common';
import { CreateExercisesPlayedDto } from './dto/create-exercises-played.dto';
import { UpdateExercisesPlayedDto } from './dto/update-exercises-played.dto';
import { Exercises } from '../exercises/entities/exercises.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Children } from '../childs/entities/childs.entity';
import { ExercisesPlayed } from './entities/exercises-played.entity';

@Injectable()
export class ExercisesPlayedService {
  constructor(
    @InjectRepository(ExercisesPlayed)
    private exercisesPlayedRepository: Repository<ExercisesPlayed>,
    @InjectRepository(Exercises)
    private readonly exercisesRepository: Repository<Exercises>,
    @InjectRepository(Children)
    private childrenRepository: Repository<Children>,
  ) {}
  create(createExercisesPlayedDto: CreateExercisesPlayedDto) {
    return 'This action adds a new exercisesPlayed';
  }

  /*async findAll(childId:number): Promise<any> {
    try {
      const exercisesPlayedRepository = getRepository(ExercisesPlayed);

      // Construct the query using QueryBuilder
      const playedExercises = await exercisesPlayedRepository.createQueryBuilder("exercisesPlayed")
        .innerJoinAndSelect("exercisesPlayed.children", "children", "children.id = :childId", { childId })
        .getMany();

      return playedExercises;
      
    }catch (error) {
      console.error('Error fetching active exercises by sub-category:', error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} exercisesPlayed`;
  }*/

  update(id: number, updateExercisesPlayedDto: UpdateExercisesPlayedDto) {
    return `This action updates a #${id} exercisesPlayed`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercisesPlayed`;
  }
}
