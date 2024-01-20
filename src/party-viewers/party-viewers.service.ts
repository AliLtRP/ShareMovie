import { Injectable } from '@nestjs/common';
import { CreatePartyViewerDto } from './dto/create-party-viewer.dto';
import { UpdatePartyViewerDto } from './dto/update-party-viewer.dto';

@Injectable()
export class PartyViewersService {
  create(createPartyViewerDto: CreatePartyViewerDto) {
    return 'This action adds a new partyViewer';
  }

  findAll() {
    return `This action returns all partyViewers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partyViewer`;
  }

  update(id: number, updatePartyViewerDto: UpdatePartyViewerDto) {
    return `This action updates a #${id} partyViewer`;
  }

  remove(id: number) {
    return `This action removes a #${id} partyViewer`;
  }
}
