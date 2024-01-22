import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartyVideoService } from './party-video.service';
import { CreatePartyVideoDto } from './dto/create-party-video.dto';
import { UpdatePartyVideoDto } from './dto/update-party-video.dto';

@Controller('party-video')
export class PartyVideoController {
  constructor(private readonly partyVideoService: PartyVideoService) {}

  @Post()
  create(@Body() createPartyVideoDto: CreatePartyVideoDto) {
    return this.partyVideoService.create(createPartyVideoDto);
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
