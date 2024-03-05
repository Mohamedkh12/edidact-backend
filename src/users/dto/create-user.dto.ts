import { PartialType } from "@nestjs/mapped-types"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  username:string

  @IsEmail()
  email:string

  @IsString()
  password:string

  @IsNumber()
  roleId:number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
