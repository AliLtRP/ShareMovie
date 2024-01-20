import { OmitType } from '@nestjs/mapped-types';
import { Party } from '../entities/party.entity';

export class CreatePartyDto extends OmitType(Party, [
  'id',
  'admin',
  'create_At',
]) {}
