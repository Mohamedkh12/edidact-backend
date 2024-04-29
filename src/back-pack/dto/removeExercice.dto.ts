import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveExerciseDto {
  @IsNotEmpty()
  @IsNumber()
  parentId: number;

  @IsNotEmpty()
  @IsNumber()
  childId: number;

  @IsNotEmpty()
  @IsNumber()
  exerciseId: number;
}
