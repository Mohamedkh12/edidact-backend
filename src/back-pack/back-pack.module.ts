import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Back_pack } from './entities/back_pack.entity';
import { BackPackController } from './back-pack.controller';
import { BackPackService } from './back-pack.service';

@Module({
  imports: [TypeOrmModule.forFeature([Back_pack])],
  controllers: [BackPackController],
  providers: [BackPackService],
})
export class BackPackModule {}
