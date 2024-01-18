import { UserLogin } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginEntity implements UserLogin {
  id: string;

  // if email does not exist use usernaem
  @ValidateIf((object) => !object.email)
  @IsString()
  @IsNotEmpty()
  username: string;

  // if username does not exist use email
  @ValidateIf((object) => !object.username)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
