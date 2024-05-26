import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsNumber()
  week: number;

  @IsNotEmpty()
  @IsString()
  domaine: string;

  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  @IsString()
  sub_category: string;

  @IsNotEmpty()
  @IsString()
  sub_sub_category: string;

  @IsNotEmpty()
  @IsString()
  sub_sub_sub_category: string;

  @IsNotEmpty()
  @IsString()
  trail: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  active: string;

  @IsNotEmpty()
  @IsString()
  objective: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  created_at: Date;

  @IsNotEmpty()
  updated_at: Date;

  deleted_at: Date;
  @IsNotEmpty()
  @IsNumber()
  ChildId: number;
}

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
