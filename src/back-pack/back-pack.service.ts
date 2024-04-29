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

      backPack.exercises = [...backPack.exercises, ...newExercises];

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

    backPack = this.backPackRepository.create({
      parent,
      child,
      exercises,
    });

    await this.backPackRepository.save(backPack);
    return backPack;
  }
  async removeExerciseFromBackpack(
    backPackId: number,
    exerciseId: number,
  ): Promise<void> {
    // Trouver le backPack associé à l'exercice
    const backPack = await this.backPackRepository.findOne({
      relations: ['exercises'], // Assurez-vous que vous avez cette relation dans votre entité
      where: { id: backPackId },
    });

    if (!backPack) {
      throw new Error('Back_pack not found');
    }

    // Filtrer et mettre à jour la liste des exercices dans le backPack
    backPack.exercises = backPack.exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );

    // Sauvegarder les changements dans le backPack
    await this.backPackRepository.save(backPack);

    // Supprimer l'entrée de jointure entre l'exercice et le backPack
    await this.backPackRepository
      .createQueryBuilder()
      .relation(Back_pack, 'exercises')
      .of(backPack)
      .remove(exerciseId);

    console.log(backPack);
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
}
