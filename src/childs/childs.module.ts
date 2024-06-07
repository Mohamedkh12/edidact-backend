import { Module } from '@nestjs/common';
import { ChildsController } from './childs.controller';
import { ChildsService } from './childs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Children } from './entities/childs.entity';
import { ExercisesPlayed } from '../exercises-played/entities/exercises-played.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Children])],
  controllers: [ChildsController],
  providers: [ChildsService],
  exports: [TypeOrmModule, ChildsService],
})
export class ChildsModule {}
