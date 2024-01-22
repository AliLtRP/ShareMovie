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
import { PartyVideoService } from './party-video.service';
import { CreatePartyVideoDto } from './dto/create-party-video.dto';
import { UpdatePartyVideoDto } from './dto/update-party-video.dto';
import { AccessTokenGuard } from 'src/auth/common/guards';
import { GetCurrentUser } from 'src/auth/common/decorators';

@Controller('party-video')
export class PartyVideoController {
  constructor(private readonly partyVideoService: PartyVideoService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @GetCurrentUser('sub') userId: string,
    @Body() createPartyVideoDto: CreatePartyVideoDto,
  ) {
    return this.partyVideoService.create(userId, createPartyVideoDto);
  }

  @Get()
  findAll() {
    return this.partyVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyVideoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartyVideoDto: UpdatePartyVideoDto,
  ) {
    return this.partyVideoService.update(+id, updatePartyVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyVideoService.remove(+id);
  }
}
