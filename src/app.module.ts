import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { ExercisesController } from './exercises/exercises.controller';
import { ExercisesModule } from './exercises/exercises.module';
import { BackPackController } from './back-pack/back-pack.controller';
import { BackPackService } from './back-pack/back-pack.service';
import { BackPackModule } from './back-pack/back-pack.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ChildsModule } from './childs/childs.module';
import { ParentsModule } from './parents/parents.module';
import { ParentsController } from './parents/parents.controller';
import { ParentsService } from './parents/parents.service';
import { ChildsService } from './childs/childs.service';
import { ChildsController } from './childs/childs.controller';
import { AdminController } from './admin/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/guards/rôles.guard';
import { ExercisesService } from './exercises/exercises.service';
import { PassportModule } from '@nestjs/passport';
import { CheckUserIdMiddleware } from './auth/middleware/enregistreur.middleware';
import { MailModule } from './mail/mail.module';
import { databaseConfig } from '../database.configue';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ExercisesModule,
    BackPackModule,
    AuthModule,
    TypeOrmModule.forRoot(databaseConfig),
    AdminModule,
    ParentsModule,
    ChildsModule,
    PassportModule,
    MailModule,
  ],
  controllers: [
    AppController,
    RolesController,
    ExercisesController,
    BackPackController,
    ChildsController,
    ParentsController,
    AdminController,
  ],
  providers: [
    AppService,
    RolesService,
    BackPackService,
    ChildsService,
    ExercisesService,
    ParentsService,
    AdminService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(CheckUserIdMiddleware).forRoutes('parents/updateChild/:id');
  }
}
