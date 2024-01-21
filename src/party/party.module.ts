import { Module } from '@nestjs/common';
import { PartyService } from './party.service';
import { PartyController } from './party.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartyViewersService } from 'src/party-viewers/party-viewers.service';

@Module({
  controllers: [PartyController],
  providers: [PartyService, PrismaService, PartyViewersService],
})
export class PartyModule {}
