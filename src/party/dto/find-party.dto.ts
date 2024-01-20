import { OmitType } from '@nestjs/mapped-types';
import { PartyEntity } from '../entities/party.entity';

export class FindPartyDto extends OmitType(PartyEntity, [
  'party_name',
  'admin',
  'create_At',
]) {}
