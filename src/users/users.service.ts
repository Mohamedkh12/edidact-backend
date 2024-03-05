import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log("bonjour")
    const roleId = parseInt(createUserDto.roleId.toString(), 10);

    // Vérifiez si l'utilisateur existe déjà par son nom d'utilisateur
    const existingUser = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
console.log("existingUser",existingUser)
    if (existingUser) {
      throw new BadRequestException('Cet utilisateur existe déjà.');
    }

    // Vérifiez si le rôle existe
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
    });
console.log("role",role)
    if (!role) {
      throw new NotFoundException(`Rôle avec l'ID ${roleId} non trouvé`);
    }

    // Créez le nouvel utilisateur
    const newUser =this.usersRepository.create({
      ...createUserDto,
      roleId,
      roles: role,
    });
console.log("newUser",newUser)
    // Enregistrez le nouvel utilisateur
    const savedUser = await this.usersRepository.save(newUser)
console.log("savedUser",savedUser)
    return savedUser;
  }
  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(idOrUsername: number | string): Promise<User | undefined> {
    if (typeof idOrUsername === 'number') {
      return this.usersRepository.findOne({ where: { id: idOrUsername } });
    } else {
      return this.usersRepository.findOne({
        where: { username: idOrUsername },
      });
    }
  }

  async findOneByusername(username: string) {
    return await this.usersRepository.findOne({where :{username:username}})
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user=await this.usersRepository.findOne({where :{id:id}})
    if(!user) throw new NotFoundException()
    Object.assign(user,updateUserDto)
    return this.usersRepository.save(user)
  }

  async remove(id: number) {
    const user=await this.usersRepository.findOne({where :{id:id}})
    if(!user) throw new NotFoundException()
    return this.usersRepository.remove(user)
  }

  async removeAll() {
    // Supprimer tous les utilisateurs
    await this.usersRepository.delete({});

    // Réinitialiser la séquence
    await this.usersRepository.query(
      'ALTER SEQUENCE users_id_seq RESTART WITH 1;',
    );

    return {
      message:
        'Tous les utilisateurs ont été supprimés et la séquence a été réinitialisée.',
    };
  }

}
