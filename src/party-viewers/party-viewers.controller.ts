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
import { PartyViewersService } from './party-viewers.service';
import { AccessTokenGuard } from 'src/auth/common/guards';
import { GetCurrentUser } from 'src/auth/common/decorators';

@Controller('party/viewers')
export class PartyViewersController {
  constructor(private readonly partyViewersService: PartyViewersService) {}

  @Post()
  create(@Body() userId: string, partyId: string) {
    return this.partyViewersService.create(partyId, userId);
  }

  @Get()
  findAll() {
    return this.partyViewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyViewersService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update')
  update(
    @GetCurrentUser('sub') userId: string,
    @Body('partyId') partyId: string,
  ) {
    return this.partyViewersService.update(userId, partyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyViewersService.remove(+id);
  }
}
