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


@Controller('users')
@UseGuards(RolesGuard,JwtAuthGuards)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    console.log("creteuser",createUserDto)
    return this.usersService.create(createUserDto);
  }
  @Roles(Role.Parent, Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Roles(Role.Parent, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Patch(':id')
  @Roles(Role.Parent, Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


}
