import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HelpersService {
  constructor(private readonly prisma: PrismaService) {}

  //   find if user is exist in the database
  async isUserExist(username: string, email: string): Promise<object> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }
}
