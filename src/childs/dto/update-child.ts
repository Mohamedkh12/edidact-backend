import { PartialType } from "@nestjs/mapped-types";
import { CreateChildDto } from "./create-child";

export class UpdateChild extends PartialType(CreateChildDto) {}