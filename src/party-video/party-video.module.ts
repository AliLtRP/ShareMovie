import { Module } from '@nestjs/common';
import { PartyVideoService } from './party-video.service';
import { PartyVideoController } from './party-video.controller';

@Module({
  controllers: [PartyVideoController],
  providers: [PartyVideoService],
})
export class PartyVideoModule {}
