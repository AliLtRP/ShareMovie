import { PartyViewers } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class PartyViewerEntity implements PartyViewers {
  id: string;

  @IsString()
  @IsNotEmpty()
  party_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string[];
}
