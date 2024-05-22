import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Codes } from './PasswordRestCode/entite/Codes.entity';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { Parents } from '../parents/entities/parents.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class MailService {
  /*private transporter;

  constructor(
    @InjectRepository(Codes)
    private codeRepository: Repository<Codes>,
    @InjectRepository(Parents)
    private parentRepository: Repository<Parents>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
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
      // Recherche du parent par son adresse e-mail
      const parent = await this.parentRepository.findOne({
        where: { email: email },
      });

      // Recherche de l'admin par son adresse e-mail
      const admin = await this.adminRepository.findOne({
        where: { email: email },
      });

      if (!parent && !admin) {
        // Si ni un parent ni un admin n'est trouvé
        throw new Error('User with this email does not exist');
      }

      // Génération du code
      const code = Math.floor(1000 + Math.random() * 9000);
      const dateCreation = new Date();
      const dateExpiration = new Date(Date.now() + 60000);

      if (parent) {
        // Enregistrement du code avec l'identifiant du parent trouvé
        await this.codeRepository.save({
          code: code,
          dateCreation: dateCreation,
          dateExpiration: dateExpiration,
          parent: { id: parent.id },
        });
        return code;
      } /*else if (admin) {
        // Enregistrement du code avec l'identifiant de l'admin trouvé
        await this.codeRepository.save({
          code: code,
          dateCreation: dateCreation,
          dateExpiration: dateExpiration,
          admin: { id: admin.id },
        });
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 heures en millisecondes
      await this.codeRepository.delete({
        dateCreation: LessThan(twentyFourHoursAgo),
      });
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
      // Vérifier si l'utilisateur est un parent ou un admin
      const user =
        (await this.parentRepository.findOne({ where: { email } })) ||
        (await this.adminRepository.findOne({ where: { email } }));

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
      return { success: true, code: code };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  async getUserCodeCountToday(email: string): Promise<number> {
    try {
      // Vérifier si l'utilisateur est un parent ou un admin
      const user =
        (await this.parentRepository.findOne({ where: { email } })) ||
        (await this.adminRepository.findOne({ where: { email } }));

      if (!user) {
        throw new Error('User with this email does not exist');
      }

      const today = new Date();
      const todayCodesCount = await this.codeRepository.count({
        where: {
          [user instanceof Parents ? 'parent' : 'admin']: user,
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

  async resendCode(email: string) {
    try {
      // Vérifier si l'utilisateur est un parent ou un admin
      const user =
        (await this.parentRepository.findOne({ where: { email } })) ||
        (await this.adminRepository.findOne({ where: { email } }));

      if (!user) {
        throw new Error('User with this email does not exist');
      }
      // Vérifier s'il existe un code non expiré pour l'utilisateur
      const existingCode = await this.codeRepository.findOne({
        where: {
          ...(user instanceof Parents ? { parent: user } : { admin: user }),
          dateExpiration: MoreThan(new Date()),
        },
      });

      // Si existingCode est défini et plus d'une minute s'est écoulée depuis la création du code
      if (existingCode) {
        const currentTime = new Date();
        const timeDiff =
          currentTime.getTime() - existingCode.dateCreation.getTime();
        const minutesPassed = Math.floor(timeDiff / (1000 * 60)); // Convertir en minutes

        // Si plus d'une minute s'est écoulée depuis la création du code
        if (minutesPassed >= 1) {
          // Créer un nouveau code pour le parent ou l'admin
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
        // S'il n'y a pas de code existant ou si le code existant est expiré, créer et envoyer un nouveau code
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
      const codeAdmin = await this.codeRepository
        .createQueryBuilder('code')
        .leftJoinAndSelect('code.admin', 'admin')
        .where('code.dateExpiration > :currentDate', {
          currentDate: new Date(),
        })
        .getOne();

      if (!existingCode && !codeAdmin) {
        throw new Error('Invalid or expired verification code');
      }

      // Hasher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      console.log('Password reset successfully');

      if (existingCode && existingCode.parent) {
        await this.parentRepository
          .createQueryBuilder()
          .update(Parents)
          .set({ password: hashedPassword }) // Utiliser le mot de passe haché
          .where('id = :id', { id: existingCode.parent.id })
          .execute();
      } else if (codeAdmin && codeAdmin.admin) {
        await this.adminRepository
          .createQueryBuilder()
          .update(Admin)
          .set({ password: hashedPassword }) // Utiliser le mot de passe haché
          .where('id = :id', { id: codeAdmin.admin.id })
          .execute();
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }*/
}
