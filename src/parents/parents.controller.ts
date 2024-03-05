import { Body, Controller, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateChildDto } from '../childs/dto/create-child';
import { Public } from '../auth/decorators/public.decorator';
import { Childs} from './entities/parents.entity';
import { JwtAuthGuards } from '../auth/guards/jwt-auth.guards';

@Controller('parents')
@UseGuards(JwtAuthGuards)
export class ParentsController {
  constructor(
    private readonly parentsService: ParentsService,
  ) {}
  @Public()
  @Post("createChild/:parentId")
  async createChild(@Param('parentId') parentId: number,@Body() createChildDto: CreateChildDto): Promise<Childs> {
    return await this.parentsService.createChild(parentId,createChildDto)
  }
}
