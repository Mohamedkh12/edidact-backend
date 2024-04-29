import { PartialType } from '@nestjs/mapped-types';
import { CreatePrentDto } from './create-Parent.dto';

export class UpdateParentDto extends PartialType(CreatePrentDto) {}
