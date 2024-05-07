import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Children, Parents } from '../parents/entities/parents.entity';
import { Public } from '../auth/decorators/public.decorator';

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
    return await this.adminService.findChildren();
  }
}
