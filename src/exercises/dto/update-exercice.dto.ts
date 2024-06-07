import { PartialType } from "@nestjs/mapped-types";
import { CreateExerciseDto } from "./create-exercice.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateExerciseDto  {
  @IsNumber()
  id: number;
  @IsString()
  classe: string;

  
  @IsString()
  category: string;


  @IsString()
  sub_category: string;

 
  @IsString()
  name: string;

 
  @IsString()
  active: string;

 
  @IsString()
  link: string;

 
  @IsString()
  objective: string;


  created_at: Date;

  
  updated_at: Date;

}