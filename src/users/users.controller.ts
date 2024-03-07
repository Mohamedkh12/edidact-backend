import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../roles/guards/rôles.guard';

import { User } from './entities/user.entity';
import { Roles } from '../roles/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuards } from '../auth/strategy/jwt-auth.guards';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../auth/jwtConstants';
import { CheckUserIdMiddleware } from '../auth/middleware/enregistreur.middleware';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly authService: AuthService
              ) {}
@Public()
  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {

    return this.usersService.create(createUserDto);
  }
  @Roles("Parent", "Admin")
  @UseGuards(JwtAuthGuards,RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Roles("Parent", "Admin")
  @UseGuards(JwtAuthGuards,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Roles("Parent", "Admin")
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
      throw new UnauthorizedException('Erreur lors de la vérification de l\'utilisateur.');
    }
  }
  @Delete(':id')
  @Roles("Admin")
  @UseGuards(JwtAuthGuards,RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


}
