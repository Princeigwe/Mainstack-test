import { IsBoolean, IsString, IsOptional, IsNumber } from "class-validator";

export class EditProductDto{
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  price: number

  @IsOptional()
  @IsBoolean()
  is_available: boolean
}