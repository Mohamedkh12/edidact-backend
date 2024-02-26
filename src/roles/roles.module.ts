import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/rôles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesGuard, RolesService],
  exports: [RolesGuard],
  controllers: [RolesController],
})
export class RolesModule {}
