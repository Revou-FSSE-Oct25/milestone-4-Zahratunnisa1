import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard) 
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.transactionService.findAll(req.user.userId);
  }

  @Post('transfer')
  transfer(@Req() req: any, @Body() body: any) {
    return this.transactionService.transfer(req.user.userId, body);
  }

  @Get('history')
  getMyTransactions(@Req() req: any) {
    return this.transactionService.getMyTransactions(req.user.userId);
  }

  @Post('deposit')
  deposit(@Req() req: any, @Body() body: any) {
    return this.transactionService.deposit(req.user.userId, body);
  }

  @Post('withdraw')
  withdraw(@Req() req: any, @Body() body: any) {
    return this.transactionService.withdraw(req.user.userId, body);
  }
}


