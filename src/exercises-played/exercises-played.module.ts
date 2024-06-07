import { Module } from '@nestjs/common';
import { ExercisesPlayedService } from './exercises-played.service';
import { ExercisesPlayedController } from './exercises-played.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesPlayed } from './entities/exercises-played.entity';
import { Children } from '../childs/entities/childs.entity';
import { ChildsService } from '../childs/childs.service';
import { ChildsModule } from '../childs/childs.module';
import { ExercisesModule } from '../exercises/exercises.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExercisesPlayed,Children]),ChildsModule,ExercisesModule],
  controllers: [ExercisesPlayedController],
  providers: [ExercisesPlayedService,ChildsService],
  exports: [TypeOrmModule,ExercisesPlayedService],
})
export class ExercisesPlayedModule {}
