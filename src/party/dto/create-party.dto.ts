import { OmitType } from '@nestjs/mapped-types';
import { PartyEntity } from '../entities/party.entity';

export class CreatePartyDto extends OmitType(PartyEntity, [
  'id',
  'admin',
  'create_At',
]) {}
