import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartyViewers } from '@prisma/client';

@Injectable()
export class PartyViewersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *
   * @param partyId
   * @param userId
   * @returns
   */
  async create(partyId: string, userId: string): Promise<PartyViewers> {
    try {
      // create party viewers to add users who watching this party
      return await this.prismaService.partyViewers.create({
        data: {
          party_id: partyId,
          user_id: [userId],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<PartyViewers[]> {
    return await this.prismaService.partyViewers.findMany();
  }

  /**
   *
   * @param partyId
   * @returns user or throw error
   */
  async findOne(partyId: string): Promise<PartyViewers> {
    try {
      return await this.prismaService.partyViewers.findFirst({
        where: {
          party_id: partyId,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @param userId
   * @param partId
   * @returns updated user
   */
  async update(userId: string, partId: string): Promise<PartyViewers> {
    try {
      const party = await this.findOne(partId);

      // if user exist throw 409 error
      if (this.isWatching(party.user_id, userId)) {
        throw new HttpException(
          'user already in watching list',
          HttpStatus.CONFLICT,
        );
      }

      // add user to the list
      party.user_id.push(userId);

      // update users list
      const updateUser = await this.prismaService.partyViewers.update({
        where: {
          party_id: partId,
        },
        data: {
          user_id: party.user_id,
        },
      });

      return updateUser;
    } catch (e) {
      throw e;
    }
  }

  // check if user is already in the users list
  isWatching(usersList: string[], user: string): boolean {
    return usersList.includes(user);
  }

  remove(id: number) {
    return `This action removes a #${id} partyViewer`;
  }
}
