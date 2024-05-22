import { IsNumber } from 'class-validator';

export class CreateCodeDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  code: string;

  @IsNumber()
  resetCode: string;

  dateCreation: Date;

  dateExpiration: Date;
}
