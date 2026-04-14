import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule,JwtModule.register({
      secret: 'SECRET_KEY',
    }),
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
