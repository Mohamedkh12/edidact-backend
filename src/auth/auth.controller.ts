import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { JwtAuthGuards } from './strategy/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(email, password);
  }

  @UseGuards(JwtAuthGuards)
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
}
