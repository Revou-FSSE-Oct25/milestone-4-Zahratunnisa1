import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';import { RolesGuard } from '../auth/roles/roles.guard';

 @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('accounts')
  getAccounts() {
    return this.adminService.getAllAccounts();
  }

  @Get('transactions')
  getTransactions() {
    return this.adminService.getAllTransactions();
  }
}

