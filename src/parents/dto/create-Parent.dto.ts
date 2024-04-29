import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreatePrentDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  tel: number;
  @IsNumber()
  roleId: number;
}

export class UpdateUserDto extends PartialType(CreatePrentDto) {}
