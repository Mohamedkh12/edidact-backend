import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  roleId: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
