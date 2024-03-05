import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../roles/guards/rôles.guard';
import {Role} from '../roles/enums/role.enum';
import { User } from './entities/user.entity';
import { JwtAuthGuards } from '../auth/guards/jwt-auth.guards';
import { Roles } from '../roles/decorators/roles.decorator';
import { CreateChildDto } from '../childs/dto/create-child';
import { Childs } from '../childs/entities/childs.entity';


@Controller('users')
@UseGuards(RolesGuard,JwtAuthGuards)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    console.log("creteuser",createUserDto)
    return this.usersService.create(createUserDto);
  }
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Parent, Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Parent, Role.Admin)
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Parent, Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


}
