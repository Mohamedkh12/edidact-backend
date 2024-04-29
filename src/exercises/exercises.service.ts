import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercises } from './entities/exercises.entity';
import { CreateExerciseDto } from './dto/create-exercice.dto';
import { Childs } from '../childs/entities/childs.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private readonly exercisesRepository: Repository<Exercises>,
    @InjectRepository(Childs)
    private childsRepository: Repository<Childs>,
  ) {}

  async getAllExercises(): Promise<Exercises[]> {
    return this.exercisesRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercises> {
    const exercise = await this.exercisesRepository.findOne({ where: { id } });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async getExercisesByName(name: string): Promise<Exercises[]> {
    return await this.exercisesRepository.find({ where: { name } });
  }

  async createExercise(
    createExerciseDto: CreateExerciseDto,
    image: Express.Multer.File,
  ): Promise<Exercises> {
    const existingExercise = await this.exercisesRepository.findOne({
      where: { name: createExerciseDto.name },
    });

    if (existingExercise) {
      throw new NotFoundException('Exercise already exists');
    }

    const child = await this.childsRepository.findOne({
      where: { id: createExerciseDto.ChildId },
    });

    const newExercise = new Exercises();
    newExercise.name = createExerciseDto.name;
    newExercise.assignment = createExerciseDto.assignment;
    newExercise.category = createExerciseDto.category;
    newExercise.description = createExerciseDto.description;
    newExercise.childs = [child];
    if (image) {
      newExercise.image = image.buffer.toString('base64');
    }
    console.log(newExercise);
    return await this.exercisesRepository.save(newExercise);
  }

  async updateExercise(
    id: number,
    updateExerciseDto: CreateExerciseDto,
    image: Express.Multer.File,
  ): Promise<Exercises> {
    const exercise = await this.getExerciseById(id);
    if (!exercise) {
      throw new NotFoundException("exercice doesn't exist");
    }

    if (image) {
      updateExerciseDto.image = image.buffer.toString('base64');
    }
    Object.assign(exercise, updateExerciseDto);
    return this.exercisesRepository.save(exercise);
  }
  //afficher les categories
  async findAllCategories(): Promise<string[]> {
    try {
      const categories = await this.exercisesRepository
        .createQueryBuilder('exercises')
        .select('DISTINCT exercises.category')
        .getRawMany();

      return categories.map((category) => category.category);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  async deleteExercise(id: number): Promise<void> {
    // Trouver l'exercice par ID
    const exercise = await this.exercisesRepository.findOne({
      where: { id },
      relations: ['childs'],
    });

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    // Supprimer les relations entre l'exercice et les enfants
    for (const child of exercise.childs) {
      await this.exercisesRepository
        .createQueryBuilder()
        .relation(Exercises, 'childs')
        .of(exercise)
        .remove(child.id);
    }

    // Maintenant, vous pouvez supprimer l'exercice
    await this.exercisesRepository.remove(exercise);
  }

  //afficher les exercices par categories
  async getExercisesByCategory(category: string, image): Promise<Exercises[]> {
    const exercises = await this.exercisesRepository
      .createQueryBuilder('exercise')
      .where('exercise.category = :category', { category })
      .select([
        'exercise.id',
        'exercise.name',
        'exercise.assignment',
        'exercise.category',
        'exercise.description',
        'exercise.image',
      ])
      .getMany();
    if (image) {
      exercises.forEach((exercise) => {
        exercise.image = image.buffer.toString('base64');
      });
    }
    return exercises;
  }

  //calculer nombre des exercices par categories
  async getExerciseCountByCategory(category: string): Promise<number> {
    const exerciseCount = await this.exercisesRepository
      .createQueryBuilder('exercise')
      .where('exercise.category = :category', { category })
      .getCount();

    return exerciseCount;
  }

  async getCategoriesByClass(classe: string): Promise<any> {
    try {
      const results = await this.exercisesRepository
        .createQueryBuilder('exercise')
        .innerJoinAndSelect('exercise.childs', 'child')
        .where('child.classe = :classe', { classe })
        .select(['child.classe AS class', 'exercise.category AS category'])
        .groupBy('child.classe, exercise.category')
        .getRawMany();

      // Group categories by class
      const groupedCategories = results.reduce(
        (acc, { class: classKey, category }) => {
          if (!acc[classKey]) {
            acc[classKey] = [];
          }
          acc[classKey].push(category);
          return acc;
        },
        {},
      );

      return groupedCategories;
    } catch (error) {
      console.error('Error fetching categories by class:', error);
      throw error;
    }
  }
}
