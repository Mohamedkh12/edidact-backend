import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from '../childs/dto/create-child';
import { Childs, Parents } from './entities/parents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentsService {
  constructor(@InjectRepository(Childs)
              private childRepository: Repository<Childs>,
              @InjectRepository(Parents)
              private parentsRepository: Repository<Parents>,
              ) {}
    async createChild(parentId: number,createChildDto:CreateChildDto): Promise<Childs>
    {
      const parent=this.parentsRepository.findOne({where: {id: parentId}})
      if (!parent) {
        throw new NotFoundException('Parent not found');
      }
      const existingChild = await this.childRepository.findOne({ where: { username: createChildDto.username } });
      if (existingChild) {
        throw new NotFoundException('Child with the same username already exists for this parent');
      }
      const child = new Childs()
      Object.assign(child, createChildDto)

      return await this.childRepository.save(child)
    }

}
