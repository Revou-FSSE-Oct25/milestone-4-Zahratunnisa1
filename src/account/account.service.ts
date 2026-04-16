import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  // 🔥 CREATE
  async create(userId: string) {
    return this.prisma.account.create({
      data: {
        userId,
        balance: 0,
      },
    });
  }

  // 🔥 GET ALL (punya user)
  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
    });
  }

  // 🔥 GET BY ID
  async findOne(userId: string, accountId: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });

    if (!account) {
      throw new BadRequestException('Account tidak ditemukan');
    }

    return account;
  }

  // 🔥 UPDATE
  async update(userId: string, accountId: string, data: any) {
    await this.findOne(userId, accountId);

    return this.prisma.account.update({
      where: { id: accountId },
      data,
    });
  }

  // 🔥 DELETE
  async delete(userId: string, accountId: string) {
    await this.findOne(userId, accountId);

    return this.prisma.account.delete({
      where: { id: accountId },
    });
  }
}

