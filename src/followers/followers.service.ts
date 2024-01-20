import { Injectable } from '@nestjs/common';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Followers } from '@prisma/client';

@Injectable()
export class FollowersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFollowerDto: CreateFollowerDto): Promise<Followers> {
    return await this.prismaService.followers.create({
      data: createFollowerDto,
    });
  }

  findAll() {
    return `This action returns all followers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follower`;
  }

  update(id: number, updateFollowerDto: UpdateFollowerDto) {
    return `This action updates a #${id} follower`;
  }

  remove(id: number) {
    return `This action removes a #${id} follower`;
  }
}
