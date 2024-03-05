import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChildDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  id_parent: number;
}