import { IsNumber } from 'class-validator';

export class CreateCodeDto {
  @IsNumber()
  parentId: number;

  @IsNumber()
  code: string;

  @IsNumber()
  resetCode: string;

  dateCreation: Date;

  dateExpiration: Date;
}
