import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [HelpersService, PrismaService],
  exports: [HelpersService],
})
export class HelpersModule {}
