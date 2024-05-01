import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Headers,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { JwtRefreshTokenStrategy } from './strategy/refreshToken.strategy';
import { JwtAuthGuards } from './strategy/jwt-auth.guards';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
  ): Promise<{ access_token: string }> {
    const { username, password } = signInDto;
    return await this.authService.signIn(username, password);
  }
  @UseGuards(JwtRefreshTokenStrategy)
  @Post('refreshToken')
  async refreshToken(@Body('refresh_Token') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
  @Public()
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req);
    return { message: 'Logged out successfully' };
  }
  @Public()
  @Get('userRole')
  async getUserRole(
    @Headers('Authorization') authHeader: string,
  ): Promise<{ role: string | null }> {
    console.log('authHeader', authHeader);
    if (!authHeader) {
      return { role: null };
    }

    const token = authHeader.split(' ')[1]; // Extraction du token depuis l'en-tête Authorization
    console.log('token', token);
    const role = await this.authService.checkUserRole(token);
    console.log('role', role);

    return { role };
  }
}
