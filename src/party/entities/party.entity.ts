import { Party as PartyModel } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class Party implements PartyModel {
  id: string;

  @IsString()
  @IsNotEmpty()
  admin: string;

  @IsString()
  @IsNotEmpty()
  party_name: string;

  @IsDate()
  @IsNotEmpty()
  create_At: Date;
}
