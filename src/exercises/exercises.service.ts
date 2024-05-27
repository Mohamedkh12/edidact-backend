// @ts-ignore

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
  ): Promise<Exercises> {
    const existingExercise = await this.exercisesRepository.findOne({
      where: { name: createExerciseDto.name },
    });

    if (existingExercise) {
      throw new NotFoundException('Exercise already exists');
    }

    const newExercise = new Exercises();
    newExercise.class = createExerciseDto.class;
    newExercise.category = createExerciseDto.category;
    newExercise.sub_category = createExerciseDto.sub_category;
    newExercise.name = createExerciseDto.name;
    newExercise.link = createExerciseDto.link;
    newExercise.objective = createExerciseDto.objective;
    newExercise.active = createExerciseDto.active;
    newExercise.created_at = createExerciseDto.created_at;
    newExercise.updated_at = createExerciseDto.updated_at;
    newExercise.deleted_at = createExerciseDto.deleted_at;
   
    console.log(newExercise);
    return await this.exercisesRepository.save(newExercise);
  }

  async updateExercise(
    id: number,
    updateExerciseDto: CreateExerciseDto,
  ): Promise<Exercises> {
    const exercise = await this.getExerciseById(id);
    if (!exercise) {
      throw new NotFoundException("exercice doesn't exist");
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
      relations: ['Children'],
    });

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    // Maintenant, vous pouvez supprimer l'exercice
    await this.exercisesRepository.remove(exercise);
  }

  //afficher les exercices par categories
  async getExercisesByCategory(category: string): Promise<Exercises[]> {
    console.log(category);
    const exercises = await this.exercisesRepository
      .createQueryBuilder('exercise')
      .where('exercise.category = :category', { category })
      .select('*')
      .getMany();
   
    console.log(exercises);
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
  
  async getAllClasses(): Promise<string[]> {
    try {
      const classes = await this.exercisesRepository
        .createQueryBuilder('exercise')
        .select('DISTINCT exercise.class')
        .getRawMany();

      return classes.map((exercise) => exercise.class);
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  }
  async getCategoriesByClass(): Promise<any> {
    const exercises = await this.exercisesRepository.find();

    const result = exercises.reduce((acc, exercise) => {
      if (!acc[exercise.class]) {
        acc[exercise.class] = new Set();
      }
      acc[exercise.class].add(exercise.category);
      return acc;
    }, {});

    // Convert sets to arrays
    for (const key in result) {
      result[key] = Array.from(result[key]);
    }

    return result;
  }
  
  async getSubCategoryByCategory():Promise<any>{
    const exercises = await this.exercisesRepository.find();
    
    const result = exercises.reduce((acc, exercise)=>{
      if  (!acc[exercise.category]) {
        acc[exercise.category] = new Set();
      }
      acc[exercise.category].add(exercise.sub_category)
      return acc
    },{});

    for (const key in result) {
      result[key] = Array.from(result[key]);
    }
    
    return result
  }
  async getExercisesBySubCategory(classParam: string, category: string, subCategory: string): Promise<Exercises[]> {
    try {
      const exercises = await this.exercisesRepository.find({ where: { class: classParam, sub_category: subCategory, category: category } });
      return exercises;
    } catch (error) {
      console.error('Error fetching exercises by sub-category:', error);
      throw error;
    }
  }


async showExercice(): Promise<Exercises[]> {
    return this.exercisesRepository.find({
      where: {
        active: '1',
      },
    });
  }

  async changeExerciseStatus(
    exerciseId: number,
    newStatus: string,
  ): Promise<Exercises> {
    const exercise = await this.exercisesRepository.findOne({
      where: { id: exerciseId },
    });
    if (!exercise) {
      throw new Error(`L'exercice avec l'ID ${exerciseId} n'existe pas.`);
    }
    exercise.active = newStatus;
    console.log(newStatus);
    return this.exercisesRepository.save(exercise);
  }
}