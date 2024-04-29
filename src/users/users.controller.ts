import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { User } from './entities/user.entity';
import { Roles } from '../roles/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto | CreateUserDto[]) {
    try {
      const users = await this.usersService.create(createUserDto);
      return { success: true, data: users };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  @Roles('Parent', 'Admin')
  @UseGuards(JwtAuthGuards, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Roles('Parent', 'Admin')
  @UseGuards(JwtAuthGuards, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Public()
  @Get('/findByusername/:username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    return await this.usersService.findOneByusername(username);
  }
  @Roles('Parent', 'Admin')
  @UseGuards(JwtAuthGuards)
  @UseGuards(RolesGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      throw new UnauthorizedException(
        "Erreur lors de la vérification de l'utilisateur.",
      );
    }
  }
  @Delete(':id')
  @Roles('Admin')
  @UseGuards(JwtAuthGuards, RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
