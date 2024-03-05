import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('Validating user:', username);
    const user = await this.usersService.findOneByusername(username);
    console.log('User from DB:', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log('Validation successful');
      return result;
    }

    console.log('Validation failed');
    return null;
  }
  async signIn(username: string, password: string): Promise<{ access_token: string, refreshToken: string, user: User }> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.username = :username', { username })
      .addSelect('roles.name')
      .getOne();
console.log("users",user)
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    const roleName = user.roles ? user.roles.name : null;

    const payload = {
      username: user.username,
      sub: user.id,
      roleName: roleName,
    };
console.log("payload",payload)
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    console.log('User:', user);
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    return { access_token: accessToken, refreshToken: refreshToken, user: user };
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