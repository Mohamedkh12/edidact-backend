import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Childs } from '../childs/entities/childs.entity';
import { Parents } from '../parents/entities/parents.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local-strategy';
import { JwtRefreshTokenStrategy } from './strategy/refreshToken.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ParentsModule } from '../parents/parents.module';
import { ChildsModule } from '../childs/childs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Childs, Parents]),
    ParentsModule,
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
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
