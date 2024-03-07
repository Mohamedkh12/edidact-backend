import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/rôles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';




@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesGuard, RolesService,JwtService ],
  exports: [TypeOrmModule,RolesGuard, RolesService,JwtService],
  controllers: [RolesController],
})
export class RolesModule {}
