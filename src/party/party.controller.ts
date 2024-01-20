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
import { PartyService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { AccessTokenGuard } from 'src/auth/common/guards';
import { GetCurrentUser } from 'src/auth/common/decorators';
import { Party } from '@prisma/client';

@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @GetCurrentUser('sub') userId: string,
    @Body() createPartyDto: CreatePartyDto,
  ): Promise<Party> {
    return this.partyService.create(userId, createPartyDto);
  }

  @Get()
  findAll() {
    return this.partyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partyService.update(+id, updatePartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyService.remove(+id);
  }
}
