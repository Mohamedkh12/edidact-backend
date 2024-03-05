import { Module } from '@nestjs/common';
import { ChildsController } from './childs.controller';
import { ChildsService } from './childs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Childs } from './entities/childs.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Childs])],
  controllers: [ChildsController],
  providers: [ChildsService],
  exports: [TypeOrmModule, ChildsService],
})
export class ChildsModule {}
