import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  transfer(@Req() req: any, @Body() body: any) {
    return this.transactionService.transfer(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
@Get('history')
getMyTransactions(@Req() req: any) {
  return this.transactionService.getMyTransactions(req.user.userId);
}
}

