import { PartialType } from '@nestjs/mapped-types';
import { CreateChildDto } from './create-child';

export class UpdateChildDto extends PartialType(CreateChildDto) {}
