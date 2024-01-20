import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FollowersModule } from './followers/followers.module';
import { PartyModule } from './party/party.module';
import { PartyViewersModule } from './party-viewers/party-viewers.module';

@Module({
  imports: [AuthModule, PrismaModule, FollowersModule, PartyModule, PartyViewersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
