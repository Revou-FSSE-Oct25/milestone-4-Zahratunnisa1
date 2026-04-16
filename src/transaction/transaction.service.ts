import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transfer(userId: string, data: { toAccountId: string; amount: number }) {
    const fromAccount = await this.prisma.account.findFirst({
      where: { userId },
    });

    if (!fromAccount) {
      throw new BadRequestException('Account tidak ditemukan');
    }

    if (fromAccount.balance < data.amount) {
      throw new BadRequestException('Saldo tidak cukup');
    }

    const toAccount = await this.prisma.account.findUnique({
      where: { id: data.toAccountId },
    });

    if (!toAccount) {
      throw new BadRequestException('Tujuan tidak ditemukan');
    }

    console.log('DATA MASUK:', data);

    // 🔥 TRANSACTION (ATOMIC)
    return this.prisma.$transaction([
      // kurangi saldo pengirim
      this.prisma.account.update({
        where: { id: fromAccount.id },
        data: {
          balance: {
            decrement: data.amount,
          },
        },
      }),

      // tambah saldo penerima
      this.prisma.account.update({
        where: { id: toAccount.id },
        data: {
          balance: {
            increment: data.amount,
          },
        },
      }),

      // simpan transaksi
      this.prisma.transaction.create({
        data: {
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
          amount: data.amount,
          type: 'TRANSFER',
        },
        
      }),

    ]);
  }

  async getMyTransactions(userId: string) {
    const account = await this.prisma.account.findFirst({
      where: { userId },
    });

    if (!account) {
      throw new BadRequestException('Account tidak ditemukan');
    }

    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { fromAccountId: account.id },
          { toAccountId: account.id },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async deposit(userId: string, data: { accountId: string; amount: number }) {
  const account = await this.prisma.account.findFirst({
    where: {
      id: data.accountId,
      userId,
    },
  });

  if (!account) {
    throw new BadRequestException('Account tidak ditemukan');
  }

  return this.prisma.$transaction([
    // tambah saldo
    this.prisma.account.update({
      where: { id: account.id },
      data: {
        balance: {
          increment: data.amount,
        },
      },
    }),

    // simpan transaksi
    this.prisma.transaction.create({
      data: {
        toAccountId: account.id,
        amount: data.amount,
        type: 'DEPOSIT',
      },
    }),
  ]);
}
async withdraw(userId: string, data: { accountId: string; amount: number }) {
  const account = await this.prisma.account.findFirst({
    where: {
      id: data.accountId,
      userId,
    },
  });

  if (!account) {
    throw new BadRequestException('Account tidak ditemukan');
  }

  if (account.balance < data.amount) {
    throw new BadRequestException('Saldo tidak cukup');
  }

  return this.prisma.$transaction([
    // kurangi saldo
    this.prisma.account.update({
      where: { id: account.id },
      data: {
        balance: {
          decrement: data.amount,
        },
      },
    }),

    // simpan transaksi
    this.prisma.transaction.create({
      data: {
        fromAccountId: account.id,
        amount: data.amount,
        type: 'WITHDRAW',
      },
    }),
  ]);
}
async findAll(userId: string) {
  return this.prisma.transaction.findMany({
    where: {
      OR: [
        {
          fromAccount: {
            userId,
          },
        },
        {
          toAccount: {
            userId,
          },
        },
      ],
    },
    include: {
      fromAccount: true,
      toAccount: true,
    },
  });
}
}

