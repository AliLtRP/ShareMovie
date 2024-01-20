import { OmitType } from '@nestjs/mapped-types';
import { Party } from '../entities/party.entity';

export class FindPartyDto extends OmitType(Party, [
  'party_name',
  'admin',
  'create_At',
]) {}
