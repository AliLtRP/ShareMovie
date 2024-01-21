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
import { PartyViewers } from '@prisma/client';

@Controller('party/viewers')
export class PartyViewersController {
  constructor(private readonly partyViewersService: PartyViewersService) {}

  @Post()
  create(@Body() userId: string, partyId: string): Promise<PartyViewers> {
    return this.partyViewersService.create(partyId, userId);
  }

  @Get()
  findAll(): Promise<PartyViewers[]> {
    return this.partyViewersService.findAll();
  }

  @Get(':id')
  findOne(@Body('partyId') partyId: string): Promise<PartyViewers> {
    return this.partyViewersService.findOne(partyId);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update')
  update(
    @GetCurrentUser('sub') userId: string,
    @Body('partyId') partyId: string,
  ): Promise<PartyViewers> {
    return this.partyViewersService.update(userId, partyId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('delete')
  remove(
    @GetCurrentUser('sub') userId: string,
    @Body('partyId') partyId: string,
  ) {
    return this.partyViewersService.remove(userId, partyId);
  }
}
