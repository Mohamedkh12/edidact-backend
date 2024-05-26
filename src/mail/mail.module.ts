import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { ParentsService } from '../parents/parents.service';
import { ParentsModule } from '../parents/parents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Codes } from './PasswordRestCode/entite/Codes.entity';
import { ChildsModule } from '../childs/childs.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    MailerModule,
    ParentsModule,
    ChildsModule,
    RolesModule,
    TypeOrmModule.forFeature([Codes]),
  ],
  controllers: [MailController],
  providers: [MailService, ParentsService],
})
export class MailModule {}
