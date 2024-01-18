import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FindAuthDto } from './dto/find-auth.dto';
import { HelpersService } from 'src/helpers/helpers.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly helpers: HelpersService,
  ) {}

  @Post('register')
  async createUser(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService
      .create(createAuthDto)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
      });
  }

  @Post('login')
  loginUser(@Body() findAuthDto: FindAuthDto) {
    return this.authService.login(findAuthDto);
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
