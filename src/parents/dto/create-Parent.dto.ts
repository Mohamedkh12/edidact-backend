import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
export class CreatePrentDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  tel: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export class UpdateUserDto extends PartialType(CreatePrentDto) {}
