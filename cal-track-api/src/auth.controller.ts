import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { createToken } from './jwt-helper';
import { UserService } from './services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { email, pass }) {
    const result = await this.userService.loginUser(email, pass);
    if (result) {
      const { password, ...user } = result;
      const token = createToken(user);
      return { ...user, token };
    }
    throw new HttpException('email/password invalid', HttpStatus.NOT_FOUND);
  }
}
