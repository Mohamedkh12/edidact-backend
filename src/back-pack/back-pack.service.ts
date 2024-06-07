import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Back_pack } from './entities/back_pack.entity';
import { CreateBackpackDto } from './dto/create-backpack.dto';
import { Exercises } from '../exercises/entities/exercises.entity';
import dataSource from '../../database.configue';

@Injectable()
export class BackPackService {
  constructor(
    @InjectRepository(Back_pack)
    private backPackRepository: Repository<Back_pack>,
    @InjectRepository(Exercises)
    private exercisesRepository: Repository<Exercises>,
  ) {}

  async addToBackPack(dto: CreateBackpackDto): Promise<Back_pack> {
    const { parentId, childId, exerciseId } = dto;

    try {
      // Recherchez le Back_pack existant avec la même combinaison de parent et child
      let backPack = await this.backPackRepository.findOne({
        where: { parent: { id: parentId }, child: { id: childId } },
        relations: ['exercises'],
      });

      // Si un Back_pack existe, ajoutez les nouveaux exercices à ce Back_pack
      if (backPack) {
        const newExercises = await Promise.all(
          exerciseId.map((id) =>
            this.exercisesRepository.findOne({ where: { id } }),
          ),
        );

        // Vérifiez que les exercices existent
        if (!newExercises.every(exercise => exercise !== undefined)) {
          throw new Error('One or more exercises not found');
        }

        // Ajoutez les nouveaux exercices à la liste existante
        backPack.exercises.push(...newExercises);

        // Sauvegardez le Back_pack avec les nouvelles valeurs d'exercices
        return this.backPackRepository.save(backPack);
      }

      // Si aucun Back_pack n'existe, créez un nouveau Back_pack avec les exercices fournis
      const parent = { id: parentId };
      const child = { id: childId };
      const exercises = await Promise.all(
        exerciseId.map((id) =>
          this.exercisesRepository.findOne({ where: { id } }),
        ),
      );
      console.log("exercises :",exercises);
      // Vérifiez que les exercices existent
      if (!exercises.every(exercise => exercise !== undefined)) {
        throw new Error('One or more exercises not found');
      }

      backPack = this.backPackRepository.create({
        parent,
        child,
        exercises,
      });
      console.log("backPack :",backPack);
      // Sauvegardez le nouveau Back_pack
      return this.backPackRepository.save(backPack);
    } catch (error) {
      console.error('Error adding exercise to backpack:', error);
      throw error;
    }
  }


  async removeExerciseFromBackpack(
    backPackId: number,
    exerciseId: number,
  ): Promise<Back_pack> {
    // Trouver le backPack associé à l'exercice
    const backPack = await this.backPackRepository.findOne({
      relations: ['exercises'],
      where: { id: backPackId },
    });

    if (!backPack) {
      throw new Error('Back_pack not found');
    }

    // Supprimer l'exercice de la relation ManyToMany
    await this.backPackRepository
      .createQueryBuilder()
      .relation(Back_pack, 'exercises')
      .of(backPack)
      .remove(exerciseId);

    // Retourner le Back_pack mis à jour
    return backPack;
  }

  async getBackPackByParent(parentId: number): Promise<Back_pack[]> {
    return this.backPackRepository.find({
      where: { parent: { id: parentId } },
      relations: ['exercises'],
    });
  }

  async getBackPackByChild(childId: number): Promise<Back_pack[]> {
    return this.backPackRepository.find({
      where: { child: { id: childId } },
      relations: ['exercises'],
    });
  }

  async getExercisesByCategoryAndSubcategory(idChild: number): Promise<{ [category: string]: { [subCategory: string]: Exercises[] } }> {
    const backPack = await this.backPackRepository.findOne({
      relations: ['exercises'],
      where: { child: { id: idChild } },
    });

    if (!backPack) {
      throw new NotFoundException('Back_pack not found');
    }

    const exercisesByCategoryAndSubcategory: { [category: string]: { [subCategory: string]: Exercises[] } } = {};

    backPack.exercises.forEach((exercise) => {
      const { category, sub_category } = exercise;
      if (!exercisesByCategoryAndSubcategory[category]) {
        exercisesByCategoryAndSubcategory[category] = {};
      }
      if (!exercisesByCategoryAndSubcategory[category][sub_category]) {
        exercisesByCategoryAndSubcategory[category][sub_category] = [];
      }
      exercisesByCategoryAndSubcategory[category][sub_category].push(exercise);
    });

    return exercisesByCategoryAndSubcategory;
  }



}
