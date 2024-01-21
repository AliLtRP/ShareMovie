import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartyViewers } from '@prisma/client';

@Injectable()
export class PartyViewersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *
   * @param partyId
   * @param userId
   * @returns created party
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
   * to find party and if there is no party with this partyId prisma will return null
   * @param partyId
   * @returns party viewer
   */
  async findOne(partyId: string): Promise<PartyViewers> {
    const partyViewer = await this.prismaService.partyViewers.findFirst({
      where: {
        party_id: partyId,
      },
    });

    if (!partyViewer) throw new NotFoundException('party not found');

    return partyViewer;
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

  /**
   * remove user forom watching partys
   * @param userId
   * @param partyId
   * @returns watching party
   */
  async remove(userId: string, partyId: string): Promise<PartyViewers> {
    try {
      const isUserWatching = await this.findOne(partyId);

      if (!this.isWatching(isUserWatching.user_id, userId))
        throw new HttpException('user not watching', HttpStatus.BAD_REQUEST);

      const newUsersList: Array<string> = isUserWatching.user_id.filter(
        (v) => v != userId,
      );

      return await this.prismaService.partyViewers.update({
        where: {
          party_id: isUserWatching.party_id,
        },
        data: {
          user_id: newUsersList,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
