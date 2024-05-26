import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Children } from '../childs/entities/childs.entity';
import { Repository } from 'typeorm';
import { Parents } from '../parents/entities/parents.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwtConstants';
import { Exercises } from '../exercises/entities/exercises.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Children)
    private childRepository: Repository<Children>,
    @InjectRepository(Parents)
    private parentsRepository: Repository<Parents>,
    @InjectRepository(Exercises)
    private exercisesRepository: Repository<Exercises>,
    private jwtService: JwtService,
  ) {}
  async createAdminToken(username: string, password: string): Promise<string> {
    // Vérifiez les identifiants de l'administrateur
    const isAdminValid = await this.validateAdminCredentials(
      username,
      password,
    );

    if (!isAdminValid) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    // Créez le payload du token
    const payload = {
      email: 'admin',
      sub: 'admin',
      password: 'admin',
      roleName: 'Admin',
    };

    // Créez et retournez le token
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '7d',
    });
    console.log(accessToken);
    return accessToken;
  }

  private async validateAdminCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    // Vérifiez les identifiants de l'administrateur
    if (username === 'admin' && password === 'admin') {
      return true;
    }

    return false;
  }
  async findChildren(): Promise<Children[]> {
    return await this.childRepository.find();
  }
  async findAllParent(): Promise<Parents[]> {
    return await this.parentsRepository.find();
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
