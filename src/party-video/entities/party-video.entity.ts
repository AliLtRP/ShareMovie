import { PartyVideo } from '@prisma/client';
import { IsNotEmptyAndString } from '../common/decorators';

export class PartyVideoEntity implements PartyVideo {
  id: string;

  @IsNotEmptyAndString()
  uploadedUser: string;

  @IsNotEmptyAndString()
  title: string;

  @IsNotEmptyAndString()
  description: string;
}
