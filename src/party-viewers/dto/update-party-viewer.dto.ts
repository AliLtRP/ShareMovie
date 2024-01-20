import { PartialType } from '@nestjs/swagger';
import { CreatePartyViewerDto } from './create-party-viewer.dto';

export class UpdatePartyViewerDto extends PartialType(CreatePartyViewerDto) {}
