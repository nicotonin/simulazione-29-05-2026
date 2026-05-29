import { IsOptional, IsString } from "class-validator";

export class CreateClienteDTO {

  @IsString()
  nominativo: string;

  @IsString()
  via: string;

  @IsString()
  comune: string;

  @IsOptional()
  @IsString()
  provincia?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  note?: string;
}