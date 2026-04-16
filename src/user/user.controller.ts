import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // 🔥 GET PROFILE
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.userId);
  }

  // 🔥 UPDATE PROFILE
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() req: any, @Body() body: any) {
    return this.userService.updateProfile(req.user.userId, body);
  }
}

