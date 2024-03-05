import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateBackpackDto } from './dto/create-backpack.dto';
import { BackPackService } from './back-pack.service';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/decorators/roles.decorator';
import { JwtAuthGuards } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';

@Controller('back-pack')
@UseGuards(RolesGuard,JwtAuthGuards)
export class BackPackController {
  constructor(private readonly backpackService: BackPackService) {}

  @Post('addToBackpack')
  @Roles(Role.Parent)
  async addToBackpack(@Request() req, @Body() createBackpackDto: CreateBackpackDto) {
    const { idExercises } = createBackpackDto;
    const { userId } = req.user;
    return this.backpackService.addToBackpack(userId, idExercises);
  }
  @Delete(":idExercises")
  @Roles(Role.Parent)
  async deleteFromBackpack(@Param('idExercises') idExercises: number, @Request() req) {
    const { userId } = req.user;
    return this.backpackService.deleteFromBackpack(userId, idExercises);
  }
  @Get("getAllBackpack")
  @Roles(Role.Parent, Role.Child)
  async getAllBackpack() {
    return this.backpackService.findAll();
  }
}
