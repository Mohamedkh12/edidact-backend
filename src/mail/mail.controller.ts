import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('forgotPassword')
  async forgotPassword(@Body('email') email: string) {
    try {
      const result = await this.mailService.forgotPassword(email);
      return {
        message: ' email sent successfully',
        result,
      };
    } catch (error) {
      return {
        message: 'Failed to send password reset email',
        error: error.message,
      };
    }
  }

  @Public()
  @Post('check-code')
  async checkCodeExists(@Body('code') code: number) {
    try {
      const existingCode = await this.mailService.checkCodeExists(code);
      if (existingCode) {
        return {
          success: true,
          code: existingCode.code,
        };
      } else {
        return {
          message: 'Code does not exist',
        };
      }
    } catch (error) {
      return {
        message: 'Failed to check code existence',
        error: error.message,
      };
    }
  }

  @Public()
  @Post('resetPassword')
  async resetPassword(@Body('newPassword') newPassword: string) {
    try {
      await this.mailService.resetPassword(newPassword);
      return { message: 'Password reset successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Public()
  @Post('resend-code')
  async resendCode(@Body('email') email: string) {
    try {
      const result = await this.mailService.resendCode(email);
      return { success: true, code: result.code };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
