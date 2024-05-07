import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../jwtConstants';
import { InjectRepository } from '@nestjs/typeorm';
import { Children } from '../../childs/entities/childs.entity';
import { Repository } from 'typeorm';
import { Parents } from '../../parents/entities/parents.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @InjectRepository(Children)
    private childRepository: Repository<Children>,
    @InjectRepository(Parents)
    private parentRepository: Repository<Parents>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    let user;
    if (payload.role === 'parent') {
      user = await this.parentRepository.findOne(payload.sub);
    } else if (payload.role === 'child') {
      user = await this.childRepository.findOne(payload.sub);
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      sub: payload.id,
      email: payload.email,
      password: payload.password,
      roleName: payload.roleName,
    };
  }
}
