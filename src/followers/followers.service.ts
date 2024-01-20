import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Followers } from '@prisma/client';
import { CreateFollowerDto } from './dto/create-follower.dto';

@Injectable()
export class FollowersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *
   * @param createFollowerDto dto that has user info
   * @returns user or throw exception bad request
   */
  async create(createFollowerDto: CreateFollowerDto): Promise<Followers> {
    try {
      const user = await this.prismaService.followers.create({
        data: { followed_id: createFollowerDto.followed_id },
      });

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async followUser(createFollowerDto: CreateFollowerDto): Promise<Followers> {
    try {
      return await this.incrementFollowers(createFollowerDto);
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @returns all users in the followers table
   */
  async findAll() {
    return await this.prismaService.followers.findMany();
  }

  /**
   *
   * @param userId to get user by id
   * @returns return the user
   */
  async findOne(createFollowerDto: CreateFollowerDto): Promise<any> {
    try {
      return await this.prismaService.followers.findUnique({
        where: {
          followed_id: createFollowerDto.followed_id,
        },
      });
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateFollowerDto: UpdateFollowerDto) {
    return `This action updates a #${id} follower`;
  }

  remove(id: number) {
    return `This action removes a #${id} follower`;
  }

  /**
   *
   * @param userId
   * @returns
   */
  async incrementFollowers(createFollowerDto: CreateFollowerDto) {
    try {
      const getFollowersNumber = (await this.findOne(createFollowerDto))
        .number_of_followers;

      return await this.prismaService.followers.update({
        where: { followed_id: createFollowerDto.followed_id },
        data: {
          number_of_followers: getFollowersNumber + 1,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
