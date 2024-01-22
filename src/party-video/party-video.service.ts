import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyVideoDto } from './dto/create-party-video.dto';
import { UpdatePartyVideoDto } from './dto/update-party-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartyVideo } from '@prisma/client';

@Injectable()
export class PartyVideoService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *
   * @param userId
   * @param createPartyVideoDto
   * @returns created user
   */
  async create(
    userId: string,
    createPartyVideoDto: CreatePartyVideoDto,
  ): Promise<PartyVideo> {
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

  async findAll() {
    try {
      return await this.prismaService.partyVideo.findMany();
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.partyVideo.findUnique({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatePartyVideoDto: UpdatePartyVideoDto) {
    try {
      const updateVideo = await this.prismaService.partyVideo.update({
        where: {
          id: id,
        },
        data: updatePartyVideoDto,
      });

      return updateVideo;
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.partyVideo.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.BAD_REQUEST);
    }
  }
}
