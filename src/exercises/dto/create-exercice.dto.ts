import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExerciseDto {

  @IsNumber()
  id:number;
  @IsNotEmpty()
  @IsString()
  classe: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  sub_category: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  active: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  objective: string;

}
