import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Party } from '@prisma/client';
import { FindPartyDto } from './dto/find-party.dto';
import { PartyViewersService } from 'src/party-viewers/party-viewers.service';

@Injectable()
export class PartyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly partyViewerService: PartyViewersService,
  ) {}

  /**
   *
   * @param userId admin party
   * @param createPartyDto other party info
   * @returns created party or throw an error
   */
  async create(userId: string, createPartyDto: CreatePartyDto): Promise<Party> {
    try {
      const party = await this.prismaService.party.create({
        data: {
          admin: userId,
          ...createPartyDto,
        },
      });

      this.partyViewerService.create(party.id, party.admin);

      return party;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @returns all parties
   */
  async findAll(): Promise<Party[]> {
    return await this.prismaService.party.findMany();
  }

  /**
   * search for specific party using party id
   * @param findPartyDto
   * @returns party with specific id
   */
  async findOne(findPartyDto: FindPartyDto): Promise<Party> {
    try {
      return await this.prismaService.party.findUnique({
        where: {
          id: findPartyDto.id,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @param userId
   * @param updatePartyDto
   * @returns
   */
  async update(userId: string, updatePartyDto: UpdatePartyDto): Promise<Party> {
    try {
      const isBelong = await this.isBelongToUser(userId, updatePartyDto);

      return await this.prismaService.party.update({
        where: {
          id: isBelong.id,
        },
        data: {
          party_name: updatePartyDto.party_name,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * delete party if belong to
   * @param userId
   * @param findPartyDto
   * @returns
   */
  async remove(userId: string, findPartyDto: FindPartyDto): Promise<Party> {
    try {
      const isBelong = await this.isBelongToUser(userId, findPartyDto);

      return await this.prismaService.party.delete({
        where: {
          id: isBelong.id,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * check if the party is belong to the admin
   * @param userId
   * @param findPartyDto
   * @returns party or throw forbidden exception
   */
  async isBelongToUser(userId: string, findPartyDto: FindPartyDto) {
    const isBelong = await this.findOne(findPartyDto);

    if (isBelong.admin !== userId)
      throw new ForbiddenException(
        `this party does not belong to user: ${userId}`,
      );

    return isBelong;
  }
}
