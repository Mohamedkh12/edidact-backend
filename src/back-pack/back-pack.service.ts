import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Back_pack } from './entities/back_pack.entity';
import { Repository } from 'typeorm';
import { Exercises } from '../exercises/entities/exercises.entity';
import { UsersService } from '../users/users.service';
import { ExercisesService } from '../exercises/exercises.service';

@Injectable()
export class BackPackService {
  constructor(
  @InjectRepository(Back_pack)
  private readonly backpackRepository: Repository<Back_pack>,
  private exercisesService: ExercisesService,
  private usersService: UsersService,
) {}

  async findAll(): Promise<Back_pack[]> {
    return this.backpackRepository.find();
  }
  async addToBackpack(userId: number, idExercises: number): Promise<Back_pack> {
    const userExists = await this.usersService.findOne(userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const exercises = await this.exercisesService.getExerciseById(idExercises);
    if (!exercises) {
      throw new NotFoundException('Exercise not found');
    }

    const backpackEntry = this.backpackRepository.create({
      users: userExists,
      exercises,
    });

    return this.backpackRepository.save(backpackEntry);
  }

  async deleteFromBackpack(userId: number, idExercises: number): Promise<void> {
    const userExists = await this.usersService.findOne(userId);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const exercises = await this.exercisesService.getExerciseById(idExercises);
    if (!exercises) {
      throw new NotFoundException('Exercise not found');
    }

    const backpackItem = await this.backpackRepository.findOne({
      where: {
        users: userExists,
        exercises: { id: idExercises },
      },
    });

    if (!backpackItem) {
      throw new NotFoundException('Backpack item not found');
    }

    await this.backpackRepository.remove(backpackItem);

  }
}
