import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    // kalau tidak ada user → tolak
    if (!user) {
      return false;
    }

    // hanya ADMIN yang boleh
    return user.role === 'ADMIN';
  }
}

