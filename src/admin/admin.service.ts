import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // 👤 semua user
  getAllUsers() {
    return this.prisma.user.findMany();
  }

  // 💰 semua account
  getAllAccounts() {
    return this.prisma.account.findMany();
  }

  // 💸 semua transaksi
  getAllTransactions() {
    return this.prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

