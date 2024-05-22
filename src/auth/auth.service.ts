import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    console.log('Utilisateur:', user);
    if (user) {
      console.log('Mot de passe fourni:', password);
      console.log('Mot de passe stocké (haché):', user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      } else {
        console.log('Mot de passe invalide');
      }
    } else {
      console.log('Utilisateur non trouvé');
    }
    return null;
  }

  async signIn(email: string, password: string): Promise<{ access_token: string; user: User }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      roleName: user.roles ? user.roles.name : null,
    };

    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken, user };
  }
  async refreshToken(refreshToken: string): Promise<{ refresh_Token: string }> {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      const user = await this.userRepository.findOne({
        where: { email: decoded.email },
      });

      if (!user) {
        throw new UnauthorizedException('Jeton de rafraîchissement invalide');
      }

      const payload = {
        email: user.email,
        sub: user.id,
        roleName: user.roles ? user.roles.name : null,
      };

      return {
        refresh_Token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Jeton de rafraîchissement invalide');
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
