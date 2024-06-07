// @ts-ignore

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Exercises } from './entities/exercises.entity';
import { CreateExerciseDto } from './dto/create-exercice.dto';
import { Parents } from '../parents/entities/parents.entity';
import { Children } from '../childs/entities/childs.entity';


@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private readonly exercisesRepository: Repository<Exercises>,
    @InjectRepository(Parents)
    private parentsRepository: Repository<Parents>,
    @InjectRepository(Children)
    private childrenRepository: Repository<Children>,
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

  async createExercise(createExerciseDto: CreateExerciseDto): Promise<Exercises> {
    try {
   

      const newExercise = new Exercises();
      newExercise.classe = createExerciseDto.classe;
      newExercise.category = createExerciseDto.category;
      newExercise.sub_category = createExerciseDto.sub_category;
      newExercise.name = createExerciseDto.name;
      newExercise.link = createExerciseDto.link;
      newExercise.active = createExerciseDto.active;
      newExercise.objective = createExerciseDto.objective;
      newExercise.created_at = new Date();

  
      const ex= await this.exercisesRepository.save(newExercise);

      return ex
    } catch (error) {
      throw new Error(`Failed to create exercise: ${error.message}`);
    }
  }

  async updateExercise(
    id: number,
    updateExerciseDto: CreateExerciseDto,
  ) {
    try {
      // Récupérer l'exercice à mettre à jour
      const exercise = await this.exercisesRepository.findOne({where :{id:id}})

      if (!exercise) {
        throw new NotFoundException("L'exercice n'existe pas");
      }
      
      // Mettre à jour les propriétés de l'exercice avec les nouvelles données
      exercise.classe = updateExerciseDto.classe;
      exercise.category = updateExerciseDto.category;
      exercise.sub_category = updateExerciseDto.sub_category;
      exercise.name = updateExerciseDto.name;
      exercise.active = updateExerciseDto.active;
      exercise.link = updateExerciseDto.link;
      exercise.objective = updateExerciseDto.objective;
      exercise.updated_at = new Date();

      // Sauvegarder l'exercice mis à jour dans la base de données
      const updatedExercise = await this.exercisesRepository.save(exercise);
      

      return updatedExercise;
    } catch (error) {
      // Gérer les erreurs, par exemple, journaliser l'erreur ou la renvoyer au client
      console.error('Erreur lors de la mise à jour de l\'exercice :', error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la mise à jour de l'exercice.");
    }
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
  async findAllSubCategories(): Promise<string[]> {
    try {
      const subCategories = await this.exercisesRepository
        .createQueryBuilder('exercises')
        .select('DISTINCT exercises.sub_category')
        .getRawMany();

      return subCategories.map((subCategory) => subCategory.sub_category);
    } catch (error) {
      console.error('Erreur lors de la récupération des sous-catégories :', error);
      throw error;
    }
  }

  async deleteExercise(id: number): Promise<void> {
    // Trouver l'exercice par ID
    const exercise = await this.exercisesRepository.findOne({
      where: { id },
    });

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    // Maintenant, vous pouvez supprimer l'exercice
    await this.exercisesRepository.remove(exercise);
  }

  //afficher les exercices par categories
  async getExercisesByCategory(category: string): Promise<Exercises[]> {
 
    const exercises = await this.exercisesRepository
      .createQueryBuilder('exercise')
      .where('exercise.category = :category', { category })
      .select('*')
      .getMany();

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
        .select('DISTINCT exercise.classe')
        .getRawMany();

      return classes.map((exercise) => exercise.classe);
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  }
  async getCategoriesByClass(): Promise<any> {
    const exercises = await this.exercisesRepository.find();
    const result = exercises.reduce((acc, exercise) => {
      if (!acc[exercise.classe]) {
        acc[exercise.classe] = new Set();
      }
      acc[exercise.classe].add(exercise.category);
      return acc;
    }, {});

    for (const key in result) {
      result[key] = Array.from(result[key]);
    }
    console.log("Categories :",result);
    return result;
  }

  async getSubCategoryByCategory(): Promise<any> {
    const exercises = await this.exercisesRepository.find();
    const result = exercises.reduce((acc, exercise) => {
      if (!acc[exercise.category]) {
        acc[exercise.category] = new Set();
      }
      acc[exercise.category].add(exercise.sub_category);
      return acc;
    }, {});

    for (const key in result) {
      result[key] = Array.from(result[key]);
    }
    return result;
  }
  async getExercisesBySubCategory(classParam: string, category: string, subCategory: string): Promise<Exercises[]> {
    try {
      const exercises = await this.exercisesRepository.find({ where: { classe: classParam, sub_category: subCategory, category: category } });
      return exercises;
    } catch (error) {
      console.error('Error fetching exercises by sub-category:', error);
      throw error;
    }
  }

  async getActiveExercisesBySubCategory(classParam: string, category: string, subCategory: string): Promise<any> {
    try {
      // Récupérer tous les exercices actifs dans la classe et la catégorie spécifiées
      const activeExercises = await this.exercisesRepository.find({
        where: {
          classe: classParam,
          category: category,
          sub_category : subCategory,
          active: '1',
        },
      });
      return activeExercises;
    } catch (error) {
      console.error('Error fetching active exercises by sub-category:', error);
      throw error;
    }
  }

  async findExercises( category: string, subCategory: string): Promise<any> {
    try {
      // Récupérer tous les exercices actifs dans la classe et la catégorie spécifiées
      const activeExercises = await this.exercisesRepository.find({
        where: {
          category: category,
          sub_category : subCategory,
          active: '1',
        },
      });
      return activeExercises;
    } catch (error) {
      console.error('Error fetching active exercises by sub-category:', error);
      throw error;
    }
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
    exercise.updated_at =new Date();

    return this.exercisesRepository.save(exercise);
  }

  
  async getCategoriesByParentAndChild(idParent: number, childId: number): Promise<any> {
    try {
      // Vérifier si l'enfant spécifié existe pour le parent donné
      const child = await this.childrenRepository
        .createQueryBuilder('child')
        .where('child.id = :childId AND child.parents.id = :idParent', { childId, idParent })
        .getOne();

      if (!child) {
        throw new NotFoundException('Child not found');
      }

      // Récupérer la classe de l'enfant
      const childClass = child.classe;

      // Récupérer les catégories pour la classe de l'enfant
      const categories = await this.exercisesRepository
        .createQueryBuilder('exercise')
        .select('DISTINCT exercise.category')
        .where('exercise.classe = :classe', { classe: childClass })
        .getRawMany();

      const categoriesList = categories.map(category => category.category);

      return {
        classe: childClass,
        categories: categoriesList,
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Parent not found');
      }
      console.error('Error fetching categories by parent and child:', error);
      throw error;
    }
  }
}