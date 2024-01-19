import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FindAuthDto } from './dto/find-auth.dto';
import { Token } from './types/tokens.type';
import { AccessTokenGuard, FreshTokenGuard } from './common/guards';
import { GetCurrentUser } from './common/decorators';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createAuthDto: CreateAuthDto): Promise<Token> {
    // create new user if its not already exist
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() findAuthDto: FindAuthDto): Promise<Token> {
    return this.authService.login(findAuthDto);
  }

  /**
   *
   * @GetCurrentUser it is a custom decorator that return user id
   * @param userId
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@GetCurrentUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(FreshTokenGuard)
  @Post('refresh')
  refreshToken(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  /**
   *
   * @returns all users in the db
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<object[]> {
    return this.authService.findAll();
  }

  /**
   *
   * @param userId user id to get specific user
   * @returns user
   */
  @UseGuards(AccessTokenGuard)
  @Get('find/user')
  findOne(@Body() findAuthDto: FindAuthDto): Promise<User> {
    return this.authService.findOne(findAuthDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update/user')
  update(
    @GetCurrentUser('sub') userId: string,
    @Body() updateAuthDto: UpdateAuthDto,
  ): Promise<User> {
    return this.authService.update(userId, updateAuthDto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @Delete('delete/user')
  remove(@GetCurrentUser('sub') id: string) {
    return this.authService.remove(id);
  }
}
