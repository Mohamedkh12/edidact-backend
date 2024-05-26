import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { ParentsModule } from '../parents/parents.module';
import { RolesModule } from '../roles/roles.module';
import { ChildsModule } from '../childs/childs.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ExercisesModule } from '../exercises/exercises.module';
import { ExercisesService } from '../exercises/exercises.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    ParentsModule,
    RolesModule,
    ChildsModule,
    ExercisesModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'SECRET-CODE142&of',
      signOptions: { expiresIn: '7d' },
      global: true,
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, ExercisesService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
