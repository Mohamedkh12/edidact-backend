import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parents } from './entities/parents.entity';
import { ParentsService } from './parents.service';
import { ChildsModule } from '../childs/childs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Parents]),ChildsModule,],
  exports: [TypeOrmModule,ParentsService],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}
