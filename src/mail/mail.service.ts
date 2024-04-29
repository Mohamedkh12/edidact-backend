import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Codes } from './PasswordRestCode/entite/Codes.entity';
import { MoreThan, Repository } from 'typeorm';
import { Parents } from '../parents/entities/parents.entity';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    @InjectRepository(Codes)
    private codeRepository: Repository<Codes>,
    @InjectRepository(Parents)
    private parentRepository: Repository<Parents>,
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

  async createCode(parentEmail: string) {
    try {
      // Recherche du parent par son adresse e-mail
      const parent = await this.parentRepository.findOne({
        where: { email: parentEmail },
      });

      if (!parent) {
        throw new Error('Parent with this email does not exist');
      }

      // Génération du code
      const code = Math.floor(1000 + Math.random() * 9000);
      const dateCreation = new Date();
      const dateExpiration = new Date(Date.now() + 60000);

      // Enregistrement du code avec l'identifiant du parent trouvé
      await this.codeRepository.save({
        code: code,
        dateCreation: dateCreation,
        dateExpiration: dateExpiration,
        parent: { id: parent.id },
      });
      return code;
    } catch (error) {
      console.error('Error creating code:', error);
      throw error;
    }
  }
  async checkCodeExists(
    code: number,
  ): Promise<{ code: Codes; success: boolean }> {
    try {
      const existingCode = await this.codeRepository.findOne({
        where: { code: code },
      });
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
  async forgotPassword(email: string) {
    try {
      // Vérifier si l'e-mail existe dans le tableau des parents
      const parent = await this.parentRepository.findOne({
        where: { email: email },
      });
      if (!parent) {
        throw new Error('Parent with this email does not exist');
      }

      // Vérifier si un code non expiré existe déjà pour cet e-mail
      const existingCode = await this.codeRepository.findOne({
        where: { parent: parent, dateExpiration: MoreThan(new Date()) },
      });
      if (existingCode) {
        throw new Error('A non-expired code already exists for this email');
      }

      const code = await this.createCode(parent.email);
      await this.transporter.sendMail({
        from: 'hello@edidact.ch',
        to: email,
        subject: 'Reset Password',
        html: `<p>Your reset code is: ${code}</p>`,
      });
      console.log('Email sent successfully');
      return { success: true, code: code };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async resetPassword(newPassword: string) {
    try {
      // Vérifier si le code existe et n'est pas expiré
      const existingCode = await this.codeRepository
        .createQueryBuilder('code')
        .leftJoinAndSelect('code.parent', 'parent')
        .where('code.dateExpiration > :currentDate', {
          currentDate: new Date(),
        })
        .getOne();

      if (!existingCode) {
        throw new Error('Invalid or expired verification code');
      }
      console.log('Password reset successfully');
      // Mettre à jour le mot de passe du parent
      return await this.parentRepository
        .createQueryBuilder()
        .update(Parents)
        .set({ password: newPassword })
        .where('id = :id', { id: existingCode.parent.id })
        .execute();
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  async resendCode(email: string) {
    try {
      const parent = await this.parentRepository.findOne({ where: { email } });
      if (!parent) {
        throw new Error('Parent with this email does not exist');
      }

      const existingCode = await this.codeRepository.findOne({
        where: { parent: parent, dateExpiration: MoreThan(new Date()) },
      });

      // Si un code existant est trouvé
      if (existingCode) {
        const currentTime = new Date();
        const timeDiff =
          currentTime.getTime() - existingCode.dateCreation.getTime();
        const minutesPassed = Math.floor(timeDiff / (1000 * 60)); // Convertir en minutes

        // Si plus d'une minute s'est écoulée depuis la création du code
        if (minutesPassed >= 1) {
          const newCode = await this.createCode(parent.email); // Créer un nouveau code
          await this.transporter.sendMail({
            from: 'hello@edidact.ch',
            to: email,
            subject: 'Reset Password',
            html: `<p>Your new reset code is: ${newCode}</p>`,
          });
          console.log('New code sent successfully');
          return { success: true, code: newCode };
        } else {
          // Si moins d'une minute s'est écoulée, renvoyer le code existant
          await this.transporter.sendMail({
            from: 'hello@edidact.ch',
            to: email,
            subject: 'Reset Password',
            html: `<p>Your reset code is: ${existingCode.code}</p>`,
          });
          console.log('Existing code resent successfully');
          return { success: true, code: existingCode.code };
        }
      } else {
        // Si aucun code existant n'est trouvé, créer un nouveau code
        const code = await this.createCode(parent.email);
        await this.transporter.sendMail({
          from: 'hello@edidact.ch',
          to: email,
          subject: 'Reset Password',
          html: `<p>Your reset code is: ${code}</p>`,
        });
        console.log('Code sent successfully');
        return { success: true, code: code };
      }
    } catch (error) {
      console.error('Error resending email:', error);
      throw error;
    }
  }
}
