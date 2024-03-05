import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuards } from './guards/jwt-auth.guards';


@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60m' },
  }), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, JwtStrategy, LocalStrategy,JwtAuthGuards],
  exports: [AuthService],
})
export class AuthModule {}

