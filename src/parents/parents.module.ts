import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parents } from './entities/parents.entity';
import { ParentsService } from './parents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parents])],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}
