import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.transactionService.findAll(req.user.userId);
  }

  @Get('history')
  getMyTransactions(@Req() req: any) {
    return this.transactionService.getMyTransactions(req.user.userId);
  }

  @Post('transfer')
  transfer(@Req() req: any, @Body() dto: TransferDto) {
    return this.transactionService.transfer(req.user.userId, dto);
  }

  @Post('deposit')
  deposit(@Req() req: any, @Body() dto: DepositDto) {
    return this.transactionService.deposit(req.user.userId, dto);
  }

  @Post('withdraw')
  withdraw(@Req() req: any, @Body() dto: WithdrawDto) {
    return this.transactionService.withdraw(req.user.userId, dto);
  }
}


