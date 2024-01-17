import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
