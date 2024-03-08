import { Body, Controller, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateChildDto } from '../childs/dto/create-child';

import { Childs} from './entities/parents.entity';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { Roles } from '../roles/decorators/roles.decorator';

@Controller('parents')
@UseGuards(JwtAuthGuards)
export class ParentsController {
  constructor(
    private readonly parentsService: ParentsService,
  ) {}

  @UseGuards(JwtAuthGuards, RolesGuard)
  @Roles('Parent')
  @Post("createChild")
  async createChild(@Body() createChildDto: CreateChildDto): Promise<Childs> {
    return await this.parentsService.createChild(createChildDto)
  }
}
