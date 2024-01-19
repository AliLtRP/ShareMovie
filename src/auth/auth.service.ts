import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAuthDto } from './dto/find-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // create user
  async create(createAuthDto: CreateAuthDto): Promise<object> {
    const { password } = createAuthDto;

    // generate salt and hashed password
    const salt = 10;
    const genHash = await bcrypt.hash(password, salt);

    // change user password with hashed password
    createAuthDto.password = genHash;

    return await this.prismaService.user.create({
      data: createAuthDto,
    });
  }

  // login user
  async login(findAuthDto: FindAuthDto): Promise<object> {
    const { username, email, password } = findAuthDto;

    try {
      const getUser: any = await this.findUser(findAuthDto);
      const resolvePassword = await bcrypt.compare(password, getUser.password);

      if (resolvePassword === true) {
        // const payload: object = { sub: getUser.id, username: username };

        // const token = this.jwtService.sign(payload);
        // return { accecc_token: token };
        return getUser;
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // logout user
  logout() {}

  // refresh token
  refreshToken() {}

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

  async findUser(findAuthDto: FindAuthDto): Promise<object> {
    const { username, email } = findAuthDto;

    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }
}
