import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBackpackDto {
  @IsNotEmpty()
  @IsNumber()
  idExercises: number;

  @IsNotEmpty()
  @IsNumber()
  iduser: number;
}