import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { Codes } from './PasswordRestCode/entite/Codes.entity';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    @InjectRepository(Codes)
    private codeRepository: Repository<Codes>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'mail.infomaniak.com',
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: true,
      },
      auth: {
        user: 'hello@edidact.ch',
        pass: 'School3.0',
      },
    });
  }

  async createCode(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('User with this email does not exist');
      }

      const code = Math.floor(1000 + Math.random() * 9000);
      const dateCreation = new Date();
      const dateExpiration = new Date(Date.now() + 60000);

      await this.codeRepository.save({
        code,
        dateCreation,
        dateExpiration,
        user: { id: user.id },
      });

      return code;
    } catch (error) {
      console.error('Error creating code:', error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('User with this email does not exist');
      }

      const code = await this.createCode(email);
      await this.transporter.sendMail({
        from: 'hello@edidact.ch',
        to: email,
        subject: 'Reset Password',
        html: `<p>Your code is: ${code}</p>`,
      });

      console.log('Email sent successfully');
      return { success: true, code };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async resetPassword(code: number, newPassword: string) {
    try {
      const existingCode = await this.codeRepository.findOne({
        where: { code },
        relations: ['user'],
      });

      if (!existingCode || !existingCode.user) {
        throw new Error('Invalid or expired verification code');
      }

      const currentDate = new Date();
      if (existingCode.dateExpiration < currentDate) {
        throw new Error('Code expired');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ password: hashedPassword })
        .where('id = :id', { id: existingCode.user.id })
        .execute();

      console.log(newPassword);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  async resendCode(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('User with this email does not exist');
      }

      const existingCode = await this.codeRepository.findOne({
        where: {
          user: { id: user.id },
          dateExpiration: MoreThan(new Date()),
        },
      });

      if (existingCode) {
        const currentTime = new Date();
        const timeDiff =
          currentTime.getTime() - existingCode.dateCreation.getTime();
        const minutesPassed = Math.floor(timeDiff / (1000 * 60));

        if (minutesPassed >= 1) {
          const newCode = await this.createCode(email);
          await this.transporter.sendMail({
            from: 'hello@edidact.ch',
            to: email,
            subject: 'Reset Password',
            html: `<p>Your new reset code is: ${newCode}</p>`,
          });
          console.log('New code sent successfully');
          return { success: true, code: newCode };
        }
      } else {
        const newCode = await this.createCode(email);
        await this.transporter.sendMail({
          from: 'hello@edidact.ch',
          to: email,
          subject: 'Reset Password',
          html: `<p>Your new reset code is: ${newCode}</p>`,
        });
        console.log('New code sent successfully');
        return { success: true, code: newCode };
      }
    } catch (error) {
      console.error('Error resending email:', error);
      throw error;
    }
  }

  async checkCodeExists(code: number) {
    try {
      const existingCode = await this.codeRepository.findOne({
        where: { code },
      });

      if (!existingCode) {
        throw new Error('Code does not exist');
      }

      const currentDate = new Date();
      if (existingCode.dateExpiration < currentDate) {
        throw new Error('Code expired');
      }

      return { success: true, code: existingCode };
    } catch (error) {
      console.error('Error checking code existence:', error);
      throw error;
    }
  }

  async getUserCodeCountToday(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('User with this email does not exist');
      }

      const today = new Date();
      const todayCodesCount = await this.codeRepository.count({
        where: {
          user: { id: user.id },
          dateCreation: Between(
            new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            today,
          ),
        },
      });

      return todayCodesCount;
    } catch (error) {
      console.error('Error getting user code count:', error);
      throw error;
    }
  }
}
