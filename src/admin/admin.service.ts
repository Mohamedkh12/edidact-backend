import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Childs } from '../childs/entities/childs.entity';
import { Repository } from 'typeorm';
import { Parents } from '../parents/entities/parents.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwtConstants';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Childs)
    private childRepository: Repository<Childs>,
    @InjectRepository(Parents)
    private parentsRepository: Repository<Parents>,
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
      username: 'admin',
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
  async findChildren(): Promise<Childs[]> {
    return await this.childRepository.find();
  }
  async findAllParent(): Promise<Parents[]> {
    return await this.parentsRepository.find();
  }
}
