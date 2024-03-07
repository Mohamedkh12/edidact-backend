import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus, Req, BadRequestException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RefreshJwtGuards } from './guards/refresh-jwt.Guard';

import { Public } from './decorators/public.decorator';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, 
              private usersService: UsersService
  ) {}

@Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>)
  : Promise<{ access_token: string }> {

    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {

    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Cet utilisateur existe déjà.');
    }

    const newUser: User = await this.usersService.create(createUserDto);

    return {
      user: newUser,
    };
  }

  @Post('refresh')
  async refreshToken(@Req() req): Promise<{  refreshToken: string }>  {
    return this.authService.refreshToken(req.user);
  }
}
