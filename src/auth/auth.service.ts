import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Children } from '../childs/entities/childs.entity';
import { Parents } from '../parents/entities/parents.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Children)
    private childRepository: Repository<Children>,
    @InjectRepository(Parents)
    private parentRepository: Repository<Parents>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Vérifiez si l'utilisateur existe dans la table des parents
    const parent = await this.parentRepository.findOne({ where: { email } });

    if (parent && (await bcrypt.compare(password, parent.password))) {
      const { password, ...result } = parent;
      return result;
    }

    // Vérifiez si l'utilisateur existe dans la table des enfants
    const child = await this.childRepository.findOne({ where: { email } });

    if (child && (await bcrypt.compare(password, child.password))) {
      const { password, ...result } = child;
      return result;
    }

    // Vérifiez si l'utilisateur existe dans la table des admins
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password, ...result } = admin;
      return result;
    }

    // Si ni le parent, ni l'enfant, ni l'admin n'est trouvé, retournez null
    return null;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: Children | Parents | Admin }> {
    let parent = await this.parentRepository
      .createQueryBuilder('Parents')
      .leftJoinAndSelect('Parents.roles', 'roles')
      .where('Parents.email = :email', { email })
      .addSelect('roles.name')
      .getOne();

    console.log('parent:', parent);
    let child = null;

    if (!parent) {
      child = await this.childRepository
        .createQueryBuilder('child')
        .leftJoinAndSelect('child.roles', 'roles')
        .where('child.email = :email', { email })
        .addSelect('roles.name')
        .getOne();
    }

    let admin = null;
    if (!parent && !child) {
      admin = await this.adminRepository
        .createQueryBuilder('Admin')
        .leftJoinAndSelect('Admin.roles', 'roles')
        .where('Admin.email = :email', { email })
        .addSelect('roles.name')
        .getOne();
    }

    console.log('admin:', admin);

    const entity = parent || child || admin;

    if (!entity) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, entity.password);

    console.log('entity:', entity);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      email: entity.email,
      sub: entity.id,
      roleName: entity.roles ? entity.roles.name : null,
    };

    console.log('payload:', payload);
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken, user: entity };
  }

  async refreshToken(refreshToken: string): Promise<{ refresh_Token: string }> {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      const payload = {
        email: decoded.email,
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
      console.log('decoded.roleName:', decoded.roleName);
      return decoded.roleName || null;
    } catch (error) {
      // Si le token est invalide ou expiré
      console.error('Invalid token:', error);
      return null;
    }
  }

  async logout(req: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      req.logout((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
