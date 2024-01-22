import { Module } from '@nestjs/common';
import { PartyVideoService } from './party-video.service';
import { PartyVideoController } from './party-video.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PartyVideoController],
  providers: [PartyVideoService, PrismaService],
})
export class PartyVideoModule {}
