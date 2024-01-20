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
import { FollowersService } from './followers.service';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { AccessTokenGuard } from 'src/auth/common/guards';
import { GetCurrentUser } from 'src/auth/common/decorators';
import { CheckFollowerDto } from './dto/check-follower.dto';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  create(id: string) {
    return this.followersService.create(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('follow/user')
  followUser(
    @GetCurrentUser('sub') userId: string,
    @Body() checkFollowerDto: CheckFollowerDto,
  ) {
    return this.followersService.followUser(userId, checkFollowerDto);
  }

  @Get()
  findAll() {
    return this.followersService.findAll();
  }

  @Get(':id')
  findOne(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.findOne(createFollowerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFollowerDto: UpdateFollowerDto,
  ) {
    return this.followersService.update(+id, updateFollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followersService.remove(+id);
  }
}
