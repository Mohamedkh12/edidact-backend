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
import { User } from './users/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { Exercises } from './exercises/entities/exercises.entity';
import { Back_pack } from './back-pack/entities/back_pack.entity';
import { AdminModule } from './admin/admin.module';
import { ChildsModule } from './childs/childs.module';
import { ParentsModule } from './parents/parents.module';
import { ParentsController } from './parents/parents.controller';
import { ParentsService } from './parents/parents.service';
import { ChildsService } from './childs/childs.service';
import { ChildsController } from './childs/childs.controller';
import { Childs } from './childs/entities/childs.entity';
import { Parents } from './parents/entities/parents.entity';
import { Admin } from './admin/entities/admin.entity';
import { AdminController } from './admin/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import {  RolesGuard } from './roles/guards/rôles.guard';
import { ExercisesService } from './exercises/exercises.service';
import { PassportModule } from '@nestjs/passport';
import { CheckUserIdMiddleware } from './auth/middleware/enregistreur.middleware';


@Module({
  imports: [
    UsersModule,
    RolesModule,
    ExercisesModule,
    BackPackModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'medkh',
      database: 'edidact',
      entities: [User, Back_pack, Roles, Exercises, Childs, Parents, Admin],
      synchronize: true,
    }),
    AdminModule,
    ParentsModule,
    ChildsModule,
    PassportModule,
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserIdMiddleware).forRoutes('users/update/:id');
  }
}