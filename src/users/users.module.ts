import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { RolesModule } from '../roles/roles.module';
import { ChildsModule } from '../childs/childs.module';
import { ChildsService } from '../childs/childs.service';
import { RolesService } from '../roles/roles.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { AuthService } from '../auth/auth.service';


@Module({
  imports: [TypeOrmModule.forFeature([User,Roles]),RolesModule,ChildsModule],
  exports: [TypeOrmModule,UsersService,JwtStrategy],
  controllers: [UsersController],
  providers: [UsersService,RolesGuard,ChildsService, RolesService,JwtStrategy,RolesGuard,AuthService],
})
export class UsersModule {}
