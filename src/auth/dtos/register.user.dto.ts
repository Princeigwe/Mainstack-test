import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class RegisterUserDto{
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}