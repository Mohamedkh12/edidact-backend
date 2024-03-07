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
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { ChildsService } from '../childs/childs.service';
import { ChildsModule } from '../childs/childs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ChildsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuards,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ChildsService,
  ],
  exports: [AuthService, ChildsService],
})
export class AuthModule {}

