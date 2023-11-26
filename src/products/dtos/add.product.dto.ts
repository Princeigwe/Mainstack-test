import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class AddProductDto{
  @IsString()
  @IsNotEmpty()
  title: string


  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  price: number
}