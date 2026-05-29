import { IsDateString, IsMongoId, IsString } from "class-validator";

export class CreateConsegnaDTO {

  @IsString()
  chiavediTracking: string;

  @IsDateString()
  dataDiRitiro: string;

  @IsMongoId()
  clienteID: string;
}