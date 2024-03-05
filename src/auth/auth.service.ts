import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Childs } from '../parents/entities/parents.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Childs)
    private childRepository: Repository<Childs>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('Validating user:', username);

    // Recherche d'un utilisateur par le nom d'utilisateur
    const user = await this.usersService.findOneByusername(username);
    console.log('User from DB:', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Si le mot de passe correspond, retourne l'utilisateur sans le mot de passe
      const { password, ...result } = user;
      console.log('Validation successful');
      return result;
    }

    // Recherche d'un enfant par le nom d'utilisateur
    const child = await this.childRepository.findOne({ where: { username } });
    console.log('Child from DB:', child);

    if (child && (await bcrypt.compare(password, child.password))) {
      // Si le mot de passe correspond, retourne l'enfant sans le mot de passe
      const { password, ...result } = child;
      console.log('Validation successful');
      return result;
    }

    console.log('Validation failed');
    return null;
  }

  async signIn(username: string, password: string): Promise<{ access_token: string, refreshToken: string, user: User | Childs }> {
    // Recherche de l'utilisateur dans la table des utilisateurs
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.username = :username', { username })
      .addSelect('roles.name')
      .getOne();

    // Recherche de l'enfant dans la table des enfants
    const child = user ? null : await this.childRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.parents', 'parents')
      .where('child.username = :username', { username })
      .addSelect('parents.id')
      .getOne();

    console.log("user", user);
    console.log("child", child);

    if (!user && !child) {
      throw new UnauthorizedException('User or Child not found');
    }

    const entity = user || child;
    const isPassword = await bcrypt.compare(password, entity.password);

    if (!isPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    const roleName = user ? user.roles?.name : null;

    const payload = {
      username: entity.username,
      sub: entity.id,
      roleName: roleName,
    };

    console.log("payload", payload);

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    console.log('User or Child:', entity);
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    return { access_token: accessToken, refreshToken: refreshToken, user: entity };
  }

  async getTokens(user: User): Promise<{ access_token: string, refreshToken: string }> {
    const payload = {
      username: user.username,
      sub:user.id,
      role:user.roles
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token: accessToken, refreshToken: refreshToken };
  }
  async refreshToken(user: User): Promise<{  refreshToken: string }>  {
    const payload = {
      username: user.username,
      sub:user.id,
      role:user.roles
    };
    const refreshToken =  this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      //Refresh token
      refreshToken: refreshToken,
    };
  }
}