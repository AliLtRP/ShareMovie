import { OmitType } from '@nestjs/mapped-types';
import { PartyVideoEntity } from '../entities/party-video.entity';

export class CreatePartyVideoDto extends OmitType(PartyVideoEntity, [
  'id',
  'uploadedUser',
]) {}
