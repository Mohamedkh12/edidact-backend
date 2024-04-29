import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercises } from './entities/exercises.entity';
import { ExercisesController } from './exercises.controller';
import { RolesModule } from '../roles/roles.module';
import { ParentsModule } from '../parents/parents.module';
import { ParentsService } from '../parents/parents.service';
import { ChildsService } from '../childs/childs.service';
import { ChildsModule } from '../childs/childs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercises]),
    RolesModule,
    ParentsModule,
    ChildsModule,
  ],
  exports: [TypeOrmModule, ExercisesService],
  controllers: [ExercisesController],
  providers: [ExercisesService, ParentsService, ChildsService],
})
export class ExercisesModule {}
