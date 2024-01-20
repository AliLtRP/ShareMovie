import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Party } from '@prisma/client';
import { FindPartyDto } from './dto/find-party.dto';

@Injectable()
export class PartyService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *
   * @param userId admin party
   * @param createPartyDto other party info
   * @returns created party or throw an error
   */
  async create(userId: string, createPartyDto: CreatePartyDto): Promise<Party> {
    try {
      return await this.prismaService.party.create({
        data: {
          admin: userId,
          ...createPartyDto,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @returns all parties
   */
  async findAll() {
    return await this.prismaService.party.findMany();
  }

  /**
   * search for specific party using party id
   * @param findPartyDto
   * @returns party with specific id
   */
  async findOne(findPartyDto: FindPartyDto) {
    return await this.prismaService.party.findUnique({
      where: {
        id: findPartyDto.id,
      },
    });
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`;
  }

  remove(id: number) {
    return `This action removes a #${id} party`;
  }
}
