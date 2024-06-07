import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
  NotFoundException,
  ParseIntPipe
} from '@nestjs/common';
import { BackPackService } from './back-pack.service';
import { CreateBackpackDto } from './dto/create-backpack.dto';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Back_pack } from './entities/back_pack.entity';
import { Public } from '../auth/decorators/public.decorator';

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
    try {
    const backPack= this.backPackService.getBackPackByParent(id);
    return {
      status: true,
      backPack
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  }

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Child')
  @Get('getBackPackByChild/:id')
  getBackPackByChild(@Param('id') id: number) {
    try {
    const backPack=this.backPackService.getBackPackByChild(id);
      return {
        status: true,
        backPack
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    
  }


  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent', 'Child')
  @Get('getExercisesByCategoryAndSubcategory/:idChild')
  async getGroupedExercisesBySubCategory(@Param('idChild', ParseIntPipe) idChild: number) {
    try {
      const backPack = await this.backPackService.getExercisesByCategoryAndSubcategory(idChild);
      if (Object.keys(backPack).length === 0) {
        return {
          status: false,
          message: "Back_pack is empty"
        };
      }
      return backPack;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

}
