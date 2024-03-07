import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateBackpackDto } from './dto/create-backpack.dto';
import { BackPackService } from './back-pack.service';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/decorators/roles.decorator';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';

@Controller('back-pack')

export class BackPackController {
  constructor(private readonly backpackService: BackPackService) {}

  @UseGuards(JwtAuthGuards,RolesGuard)
  @Roles("Parent")
  @Post('addToBackpack')
  async addToBackpack(@Request() req, @Body() createBackpackDto: CreateBackpackDto) {
    const { idExercises } = createBackpackDto;
    const { userId } = req.user;
    return this.backpackService.addToBackpack(userId, idExercises);
  }
  @UseGuards(JwtAuthGuards,RolesGuard)
  @Roles("Parent")
  @Delete(":idExercises")
  async deleteFromBackpack(@Param('idExercises') idExercises: number, @Request() req) {
    const { userId } = req.user;
    return this.backpackService.deleteFromBackpack(userId, idExercises);
  }
  @UseGuards(JwtAuthGuards)
  @Get("getAllBackpack")
  async getAllBackpack() {
    return this.backpackService.findAll();
  }
}
