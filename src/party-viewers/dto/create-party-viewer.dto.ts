import { OmitType } from '@nestjs/mapped-types';
import { PartyViewerEntity } from '../entities/party-viewer.entity';

export class CreatePartyViewerDto extends OmitType(PartyViewerEntity, ['id']) {}
