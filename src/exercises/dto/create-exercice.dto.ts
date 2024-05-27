import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExerciseDto {

  @IsNotEmpty()
  @IsString()
  class: string;

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