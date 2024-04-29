import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Childs } from '../childs/entities/childs.entity';
import { Parents } from '../parents/entities/parents.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Childs)
    private childRepository: Repository<Childs>,
    @InjectRepository(Parents)
    private parentRepository: Repository<Parents>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Vérifiez si l'utilisateur existe dans la table des parents
    const parent = await this.parentRepository.findOne({ where: { username } });

    if (parent && (await bcrypt.compare(password, parent.password))) {
      const { password, ...result } = parent;
      return result;
    }

    // Vérifiez si l'utilisateur existe dans la table des enfants
    const child = await this.childRepository.findOne({ where: { username } });

    if (child && (await bcrypt.compare(password, child.password))) {
      const { password, ...result } = child;
      return result;
    }

    // Si ni le parent ni l'enfant n'est trouvé, retournez null
    return null;
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; user: Childs | Parents }> {
    const parent = await this.parentRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.username = :username', { username })
      .addSelect('roles.name')
      .getOne();

    let child = null;

    if (!parent) {
      child = await this.childRepository
        .createQueryBuilder('child')
        .leftJoinAndSelect('child.roles', 'roles') // Ajoutez cette ligne pour récupérer les rôles de l'enfant
        .where('child.username = :username', { username })
        .addSelect('roles.name')
        .getOne();
    }

    if (!parent && !child) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const entity = parent || child;

    const isPasswordValid = await bcrypt.compare(password, entity.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      username: entity.username,
      sub: entity.id,
      roleName: entity.roles ? entity.roles.name : null,
    };

    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken, user: entity };
  }

  async refreshToken(refreshToken: string): Promise<{ refresh_Token: string }> {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      const payload = {
        username: decoded.username,
        sub: decoded.sub,
        roleName: decoded.roleName,
      };

      return { refresh_Token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async checkUserRole(token: string): Promise<string | null> {
    try {
      const decoded = this.jwtService.verify(token);
      console.log('decoded token :', decoded);
      console.log('decoded.rol:', decoded.roleName);
      return decoded.roleName || null;
    } catch (error) {
      // Si le token est invalide ou expiré
      console.error('Invalid token:', error);
      return null;
    }
  }
}
