import { Body, Controller, Post } from '@nestjs/common';
import { Food, User } from '@prisma/client';
import { FoodService } from './services/food.service';
import { UserService } from './services/user.service';
import { UserInfo } from './user-info.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('invite')
  async add(@Body() { name, email }) {
    console.log(email, name);
    const user = await this.userService.inviteUser(name, email);
    if (user) {
      return user;
    }
    return { error: 'duplicate' };
  }
}
