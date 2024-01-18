import { User as UserModel } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthEntity implements UserModel {
  id: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
