import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBackpackDto {
  @IsNotEmpty()
  @IsNumber()
  parentId: number;

  @IsNotEmpty()
  @IsNumber()
  childId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  exerciseId: number[];
}
