import { PartialType } from '@nestjs/mapped-types';
import { CreateExercisesPlayedDto } from './create-exercises-played.dto';

export class UpdateExercisesPlayedDto extends PartialType(CreateExercisesPlayedDto) {}
