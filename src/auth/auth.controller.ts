import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FindAuthDto } from './dto/find-auth.dto';
import { Token } from './types/tokens.type';
import { Request } from 'express';
import { AccessTokenGuard, FreshTokenGuard } from './common/guards';
import { GetCurrentUser } from './common/decorators';

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

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
