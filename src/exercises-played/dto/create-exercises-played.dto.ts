import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExercisesPlayedDto {
  @IsNotEmpty()
  @IsNumber()
  id:number;

  @IsNotEmpty()
  @IsNumber()
  child_id:number;

  @IsNotEmpty()
  @IsNumber()
  exercices_id:number;

  @IsNotEmpty()
  @IsString()
  active: string;
}
