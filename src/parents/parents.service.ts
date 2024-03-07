import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from '../childs/dto/create-child';
import { Childs, Parents } from './entities/parents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Childs)
    private childRepository: Repository<Childs>,
    @InjectRepository(Parents)
    private parentsRepository: Repository<Parents>,
  ) {}

  async createChild(createChildDto: CreateChildDto): Promise<Childs> {
    const existingChild = await this.childRepository.findOne({
      where: { username: createChildDto.username },
    });

    if (existingChild) {
      throw new NotFoundException(
        'Child with the same username already exists for this parent',
      );
    }

    // 1. Obtenir le parent associé (vous devez ajuster cela selon votre logique)
    const parentId = createChildDto.id_parent; // Assurez-vous d'obtenir l'ID du parent

    // 2. Associer l'enfant avec le parent
    const parent = await this.parentsRepository.findOne({
      where: { id: parentId },
    });


    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    const child = new Childs();
    Object.assign(child, createChildDto);

    // Assurez-vous de définir l'enfant avec le parent associé
    child.parents = parent;

    // Sauvegardez l'enfant dans la base de données
    return await this.childRepository.save(child);
  }
}
