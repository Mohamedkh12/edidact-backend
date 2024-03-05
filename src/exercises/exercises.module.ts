import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercises } from './entities/exercises.entity';
import { ExercisesController } from './exercises.controller';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercises]),RolesModule],
  exports: [TypeOrmModule,ExercisesService],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
