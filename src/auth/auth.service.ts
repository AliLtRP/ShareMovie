import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAuthDto } from './dto/find-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Token } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // create user
  async create(createAuthDto: CreateAuthDto): Promise<Token> {
    // change user password with hashed password
    createAuthDto.password = this.hashData(createAuthDto.password);

    const newUser = await this.prismaService.user.create({
      data: createAuthDto,
    });

    // generate tokens
    const tokens = await this.genTokens(newUser.id, newUser.email);

    // include token to the user model in the db
    await this.updateRt(newUser.id, tokens.refresh_token);
    return tokens;
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

  // generate hash password
  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  // generate tokens
  async genTokens(userId: string, email: string): Promise<Token> {
    const [at, rt] = await Promise.all([
      // access token
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      // refresh token
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret', // secret that must match the same secret in the strategy
          expiresIn: 60 * 60 * 24 * 7, //one week
        },
      ),
    ]);

    // return access and refresh token
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRt(userId: string, rt: string) {
    const hashRefreshToken = await this.hashData(rt);

    // include the hashed refresh token to user model
    const updateUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hashRefreshToken,
      },
    });
  }
}
