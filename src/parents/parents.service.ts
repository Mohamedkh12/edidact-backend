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
  async createChild( createChildDto: CreateChildDto): Promise<Childs> {
    const existingChild = await this.childRepository.findOne({ where: { username: createChildDto.username } });
    console.log("existingChild", existingChild);
    if (existingChild) {
      throw new NotFoundException('Child with the same username already exists for this parent');
    }
console.log("createChildDto", createChildDto);
    const child = new Childs();
    console.log("child", child);
    Object.assign(child, createChildDto);


    return await this.childRepository.save(child);
  }

}
