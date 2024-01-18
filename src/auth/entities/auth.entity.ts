import { User as UserModel } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class AuthEntity implements UserModel {
  id: string;

  @ValidateIf((object) => !object.email)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ValidateIf((object) => !object.username)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
