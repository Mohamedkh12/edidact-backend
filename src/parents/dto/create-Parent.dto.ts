import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
export class CreatePrentDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  tel: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
