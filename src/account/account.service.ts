import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getMyAccount(userId: string) {
    return this.prisma.account.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
