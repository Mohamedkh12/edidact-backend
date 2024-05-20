import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
  NotFoundException
} from '@nestjs/common';
import { BackPackService } from './back-pack.service';
import { CreateBackpackDto } from './dto/create-backpack.dto';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Back_pack } from './entities/back_pack.entity';

@Controller('backpack')
export class BackPackController {
  constructor(private readonly backPackService: BackPackService) {}

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent')
  @Post('addToBackPack')
  addToBackPack(@Body() dto: CreateBackpackDto) {
    return this.backPackService.addToBackPack(dto);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent')
  @Delete('removeFromBackPack')
  async removeFromBackPack(
    @Query('idBackPack') idBackPack: number,
    @Query('idExercise') idExercise: number,
  ): Promise<Back_pack> {
    return await this.backPackService.removeExerciseFromBackpack(
      idBackPack,
      idExercise,
    );
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent')
  @Get('getBackPackByParent/:id')
  getBackPackByParent(@Param('id') id: number) {
    return this.backPackService.getBackPackByParent(id);
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Child')
  @Get('getBackPackByChild/:id')
  getBackPackByChild(@Param('id') id: number) {
    console.log(id);
    return this.backPackService.getBackPackByChild(id);
  }
}
