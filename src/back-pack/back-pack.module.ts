import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Back_pack } from './entities/back_pack.entity';
import { BackPackController } from './back-pack.controller';
import { BackPackService } from './back-pack.service';
import {ExercisesModule} from "../exercises/exercises.module";
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ExercisesService } from '../exercises/exercises.service';
import { ChildsModule } from '../childs/childs.module';
import { RolesModule } from '../roles/roles.module';
@Module({
  imports: [TypeOrmModule.forFeature([Back_pack]),ExercisesModule,UsersModule,
    ChildsModule,RolesModule],
  controllers: [BackPackController],
  providers: [BackPackService,ExercisesService, UsersService],
  exports: [TypeOrmModule,BackPackService,UsersService],
})
export class BackPackModule {}
