import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAuthDto } from './dto/find-auth.dto';
import * as bcrypt from 'bcrypt';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<object> {
    const { username, email, password } = createAuthDto;

    await this.helpers
      .isUserExist(username, email)
      .then(() => {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      })
      .catch((e) => {
        console.log(e);
        return { msg: 'sdf' };
      });

    const salt: number = 10;

    // try {
    //   const hash = await bcrypt.hash(password, salt);
    //   createAuthDto.password = hash;
    // } catch (e) {
    //   if (e.code === 'P2002') {
    //     // Unique constraint error code in Prisma
    //     throw new HttpException('User already exists', HttpStatus.CONFLICT);
    //   }

    return await this.prismaService.user.create({
      data: createAuthDto,
    });
  }

  login(findAuthDto: FindAuthDto): object {
    const { username, email } = findAuthDto;

    // find user base on it is email or username
    return this.prismaService.user.findFirst({
      where: {
        // check for username or email
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
