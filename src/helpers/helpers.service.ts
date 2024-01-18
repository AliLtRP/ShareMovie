import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HelpersService {
  constructor(private readonly prisma: PrismaService) {}

  //   find if user is exist in the database
  async isUserExist(username: string, email: string): Promise<number> {
    return this.prisma.user.count({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }
}
