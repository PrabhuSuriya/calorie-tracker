import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { createToken } from './jwt-helper';
import { UserService } from './services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { email, pass }) {
    const { password, ...user } = await this.userService.loginUser(email, pass);
    const token = createToken(user);
    return { ...user, token };
  }
}
