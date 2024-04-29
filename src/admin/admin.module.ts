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

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    ParentsModule,
    RolesModule,
    ChildsModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'SECRET-CODE142&of',
      signOptions: { expiresIn: '7d' },
      global: true,
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
