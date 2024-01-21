import { Injectable } from '@nestjs/common';
import { CreatePartyVideoDto } from './dto/create-party-video.dto';
import { UpdatePartyVideoDto } from './dto/update-party-video.dto';

@Injectable()
export class PartyVideoService {
  create(createPartyVideoDto: CreatePartyVideoDto) {
    return 'This action adds a new partyVideo';
  }

  findAll() {
    return `This action returns all partyVideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partyVideo`;
  }

  update(id: number, updatePartyVideoDto: UpdatePartyVideoDto) {
    return `This action updates a #${id} partyVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} partyVideo`;
  }
}
