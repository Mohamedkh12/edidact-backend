import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Children, Parents } from '../parents/entities/parents.entity';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Exercises } from '../exercises/entities/exercises.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('loginAdmin')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ tokenAdmin: string }> {
    const accessToken = await this.adminService.createAdminToken(
      username,
      password,
    );

    return { tokenAdmin: accessToken };
  }
  @Public()
  @Get('AllParents')
  async findAll(): Promise<Parents[]> {
    return await this.adminService.findAllParent();
  }

  @Public()
  @Get('AllChildren')
  async findAllChild(): Promise<Children[]> {
    const children = await this.adminService.findChildren();
    console.log(children);
    return children;
  }
  //@UseGuards(JwtAuthGuards, RolesGuard)
  //@Roles('Admin')
  @Public()
  @Get('showExercice')
  async showExercice(): Promise<Exercises[]> {
    return await this.adminService.showExercice();
  }

  @Public()
  @Patch('changeExerciseStatus')
  async changeExerciseStatus(
    @Body('exerciseId') exerciseId: number,
    @Body('newStatus') newStatus: string,
  ): Promise<Exercises> {
    return await this.adminService.changeExerciseStatus(exerciseId, newStatus);
  }
}
