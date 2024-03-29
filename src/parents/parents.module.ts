import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Parents } from './entities/parents.entity';
import { ParentsService } from './parents.service';
import { ChildsService } from '../childs/childs.service';
import { ChildsModule } from '../childs/childs.module';
import { RolesModule } from '../roles/roles.module';


@Module({
  imports: [TypeOrmModule.forFeature([Parents]),ChildsModule,RolesModule],
  exports: [TypeOrmModule,ParentsService,ChildsService],
  controllers: [ParentsController],
  providers: [ParentsService,ChildsService],
})
export class ParentsModule {}
