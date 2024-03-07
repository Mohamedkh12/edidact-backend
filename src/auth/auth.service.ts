import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Childs } from '../parents/entities/parents.entity';
import { jwtConstants } from './jwtConstants';

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
    const user = await this.usersService.findOneByusername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    const child = await this.childRepository.findOne({ where: { username } });
    if (child && (await bcrypt.compare(password, child.password))) {
      const { password, ...result } = child;
      return result;
    }
    return null;
  }

  async signIn(username: string, password: string): Promise<{ access_token: string, refreshToken: string, user: User | Childs }> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.username = :username', { username })
      .addSelect('roles.name')
      .getOne();
    const child = user ? null : await this.childRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.parents', 'parents')
      .where('child.username = :username', { username })
      .addSelect('parents.id')
      .getOne();

    if (!user && !child) {
      throw new UnauthorizedException('Utilisateur ou enfant non trouvé');
    }

    const entity = user || child;
    const isPassword = await bcrypt.compare(password, entity.password);

    if (!isPassword) {
      throw new UnauthorizedException('Mauvais mot de passe');
    }
    const payload = {
      username: entity.username,
      sub: entity.id,
      roleName: entity.roles ? entity.roles.name : null,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token: accessToken, refreshToken: refreshToken, user: entity };
  }


  async validateToken(token: string): Promise<number | null> {
    try {

      const decodedToken = this.jwtService.verify(token)


      // Assurez-vous que le champ 'sub' est présent dans le token
      if (decodedToken && typeof decodedToken.sub !== 'undefined') {

        return decodedToken.sub;
      } else {
        throw new UnauthorizedException('Token invalide : champ "sub" manquant');
      }
    } catch (error) {
      console.error('Error in validateToken:', error.message);  // Log l'erreur spécifique
      throw new UnauthorizedException('Token invalide');
    }
  }

  async refreshToken(user: User): Promise<{ refreshToken: string }> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.roles
    };
    const refreshToken =  this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      refreshToken: refreshToken,
    };
  }
}
