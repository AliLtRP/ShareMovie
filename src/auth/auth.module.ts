import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, HelpersService],
})
export class AuthModule {}
