import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyAccount(@Req() req: any) {
    return this.accountService.getMyAccount(req.user.userId);
  }
}
