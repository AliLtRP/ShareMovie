import { PickType } from '@nestjs/swagger';
import { PartyEntity } from '../entities/party.entity';

export class UpdatePartyDto extends PickType(PartyEntity, [
  'id',
  'party_name',
]) {}
