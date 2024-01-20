import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Party } from '@prisma/client';

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

  findAll() {
    return `This action returns all party`;
  }

  findOne(id: number) {
    return `This action returns a #${id} party`;
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`;
  }

  remove(id: number) {
    return `This action removes a #${id} party`;
  }
}
