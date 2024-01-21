import { PartialType } from '@nestjs/swagger';
import { CreatePartyVideoDto } from './create-party-video.dto';

export class UpdatePartyVideoDto extends PartialType(CreatePartyVideoDto) {}
