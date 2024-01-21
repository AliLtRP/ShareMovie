import { Module } from '@nestjs/common';
import { PartyViewersService } from './party-viewers.service';
import { PartyViewersController } from './party-viewers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PartyViewersController],
  providers: [PartyViewersService, PrismaService],
  exports: [PartyViewersService],
})
export class PartyViewersModule {}
