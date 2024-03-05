import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from '../childs/dto/create-child';
import { Childs, Parents } from './entities/parents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ParentsService {
  constructor(@InjectRepository(Childs)
              private childRepository: Repository<Childs>,
              @InjectRepository(Parents)
              private parentsRepository: Repository<Parents>,
              ) {}
  async createChild(parentId: number, createChildDto: CreateChildDto): Promise<Childs> {
    console.log("Parent ID:", parentId);
    const parent = await this.parentsRepository.findOne({ where: { id: parentId } });
console.log("parent", parent);
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    const existingChild = await this.childRepository.findOne({ where: { username: createChildDto.username, id_parent: parent.id } });
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
