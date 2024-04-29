import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parents } from './entities/parents.entity';
import { ParentsService } from './parents.service';
import { ChildsService } from '../childs/childs.service';
import { ChildsModule } from '../childs/childs.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parents]),
    ChildsModule,
    RolesModule,
    JwtModule.register({
      secret: 'SECRET-CODE142&of',
      signOptions: { expiresIn: '60m' },
      global: true,
    }),
    PassportModule.register({ session: true }),
  ],
  exports: [TypeOrmModule, ParentsService, ChildsService],
  controllers: [ParentsController],
  providers: [ParentsService, ChildsService],
})
export class ParentsModule {}
