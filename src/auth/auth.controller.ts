import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RefreshJwtGuards } from './guards/refresh-jwt.Guard';
import { RolesGuard } from '../roles/guards/rôles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { JwtAuthGuards } from './guards/jwt-auth.guards';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, 
              private usersService: UsersService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    console.log("createUserDto",createUserDto)
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Cet utilisateur existe déjà.');
    }
    console.log("existingUser",existingUser)
    const newUser: User = await this.usersService.create(createUserDto);
    console.log("newUser",newUser)
    return {
      user: newUser,
    };
  }
  @Public()
  @UseGuards(RefreshJwtGuards)
  @Post('refresh')
  async refreshToken(@Req() req): Promise<{  refreshToken: string }>  {
    return this.authService.refreshToken(req.user);
  }
}
