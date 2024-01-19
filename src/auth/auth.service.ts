import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAuthDto } from './dto/find-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Token } from './types/tokens.type';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param createAuthDto create dto has user data
   * @returns tokens
   */
  async create(createAuthDto: CreateAuthDto): Promise<Token> {
    try {
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
    } catch (e) {
      throw new HttpException(e.meta, HttpStatus.CONFLICT);
    }
  }

  /**
   *
   * @param findAuthDto Dto class that has the user data
   * @returns tokens or throw error
   */
  async login(findAuthDto: FindAuthDto): Promise<Token> {
    try {
      const getUser: any = await this.findUser(findAuthDto);

      // if the user exist, it will compare the hashed password in the database with the user password
      const compareMatch = this.hashCompare(
        findAuthDto.password,
        getUser.password,
      );

      const tokens = await this.genTokens(getUser.id, getUser.email);

      // include token to the user model in the db
      await this.updateRt(getUser.id, tokens.refresh_token);
      return tokens;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // logout user
  async logout(userId: string) {
    return this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  // refresh token
  async refreshToken(userId: string, rt: string) {
    try {
      const user: User = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      const compareMatch = this.hashCompare(rt, user.hashedRt);

      const tokens = await this.genTokens(user.id, user.email);

      // include token to the user model in the db
      await this.updateRt(user.id, tokens.refresh_token);
      return tokens;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @returns users array
   */
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  /**
   *
   * @param id id to get user
   * @returns user object
   */
  async findOne(findAuthDto: FindAuthDto): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username: findAuthDto.username }, { email: findAuthDto.email }],
      },
    });
  }

  /**
   *
   * @param id user id to get the user from db
   * @param updateAuthDto dto that has the user info
   * @returns user
   */
  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: this.hashData(updateAuthDto.password),
      },
    });
  }

  async remove(id: string): Promise<any> {
    return await this.prismaService.user.delete({
      where: { id: id },
    });
  }

  /**
   * find user
   * @param findAuthDto Dto has the user info
   * @returns user or throw forbidden exception
   */
  async findUser(findAuthDto: FindAuthDto): Promise<User> {
    // get the username and email
    const { username, email } = findAuthDto;

    // check if the user is exist in the database using email or username
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    // if user is does not exist it will throw forbidden exception
    if (!user) throw new ForbiddenException('Access Denied');
    return user;
  }

  /**
   *
   * @param data data that will hashed
   * @returns new hashed data
   */
  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  /**
   *
   * @param userData from findAuthDto which is normal(not hashed)
   * @param userHash hashed info from database
   * @returns true if password is match or throw forbidden exception
   */
  hashCompare(userData: string, userHash: string): boolean {
    const compareMatch: boolean = bcrypt.compareSync(userData, userHash);

    if (!compareMatch) throw new ForbiddenException('Access Denied');

    return compareMatch;
  }

  /**
   *
   * @param userId user id from findAuthDto
   * @param email  email from findAuthDto
   * @returns access and refresh token
   */
  async genTokens(userId: string, email: string): Promise<Token> {
    const [at, rt] = await Promise.all([
      // access token
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS,
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
          secret: process.env.JWT_REFRESH, // secret that must match the same secret in the strategy
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

  /**
   *
   * @param userId user id from findAuthDto
   * @param rt user refresh token
   */
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
