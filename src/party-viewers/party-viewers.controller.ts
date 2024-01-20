import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartyViewersService } from './party-viewers.service';
import { CreatePartyViewerDto } from './dto/create-party-viewer.dto';
import { UpdatePartyViewerDto } from './dto/update-party-viewer.dto';

@Controller('party-viewers')
export class PartyViewersController {
  constructor(private readonly partyViewersService: PartyViewersService) {}

  @Post()
  create(@Body() createPartyViewerDto: CreatePartyViewerDto) {
    return this.partyViewersService.create(createPartyViewerDto);
  }

  @Get()
  findAll() {
    return this.partyViewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyViewersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyViewerDto: UpdatePartyViewerDto) {
    return this.partyViewersService.update(+id, updatePartyViewerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyViewersService.remove(+id);
  }
}
