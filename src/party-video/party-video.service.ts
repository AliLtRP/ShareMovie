import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyVideoDto } from './dto/create-party-video.dto';
import { UpdatePartyVideoDto } from './dto/update-party-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartyVideoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createPartyVideoDto: CreatePartyVideoDto) {
    try {
      const addVideoParty = await this.prismaService.partyVideo.create({
        data: {
          uploadedUser: userId,
          ...createPartyVideoDto,
        },
      });

      return addVideoParty;
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.BAD_REQUEST);
    }
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
