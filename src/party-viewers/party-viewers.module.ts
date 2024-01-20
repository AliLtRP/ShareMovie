import { Module } from '@nestjs/common';
import { PartyViewersService } from './party-viewers.service';
import { PartyViewersController } from './party-viewers.controller';

@Module({
  controllers: [PartyViewersController],
  providers: [PartyViewersService],
})
export class PartyViewersModule {}
