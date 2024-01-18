import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAuthDto } from './dto/find-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAuthDto: CreateAuthDto): object {
    return this.prismaService.user.create({
      data: createAuthDto,
    });
  }

  login(findAuthDto: FindAuthDto): object {
    const { username, email } = findAuthDto;

    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
