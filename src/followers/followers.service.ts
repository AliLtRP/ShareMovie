import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Followers } from '@prisma/client';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { CheckFollowerDto } from './dto/check-follower.dto';
import { FollowerEntity } from './entities/follower.entity';

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

  /**
   *
   * @param userId user id from token
   * @param createFollowerDto
   * @returns
   */
  async followUser(
    userId: string,
    checkFollowerDto: CheckFollowerDto,
  ): Promise<any> {
    try {
      const isUserExist = await this.isUserAlreadyFollower(
        userId,
        checkFollowerDto,
      );

      return await this.incrementFollowers(userId, checkFollowerDto);
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
   * @param userId this is the follower id
   * @param checkFollowerDto the followed info
   * @returns user wit new followers or throw an http exception
   */
  async incrementFollowers(
    userId: string,
    checkFollowerDto: CheckFollowerDto,
  ): Promise<Followers> {
    try {
      const user: FollowerEntity = await this.findOne(checkFollowerDto);

      // push user to followers string[]
      user.followers_id.push(userId);

      // update the user
      return await this.prismaService.followers.update({
        where: { followed_id: user.followed_id },
        data: {
          followers_id: user.followers_id,
          number_of_followers: user.number_of_followers + 1,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * to check if the user is already follower
   * @param userId
   * @param checkFollowerDto
   */
  async isUserAlreadyFollower(
    userId: string,
    checkFollowerDto: CheckFollowerDto,
  ) {
    try {
      // get followed user
      const targetUser = await this.prismaService.followers.findFirst({
        where: { followed_id: checkFollowerDto.followed_id },
      });

      // check if user is already followed the target user
      await targetUser.followers_id.filter((v) => {
        if (v == userId) {
          throw new HttpException(
            `You already follow ${targetUser.followed_id}`,
            HttpStatus.CONFLICT,
          );
        }
      });
    } catch (e) {
      throw e;
    }
  }
}
