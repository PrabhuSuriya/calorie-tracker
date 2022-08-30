import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create the user if the email is available
  @Post('invite')
  async add(@Body() { name, email }) {
    const user = await this.userService.inviteUser(name, email);
    if (user) {
      return user;
    }
    return { error: 'duplicate' };
  }
}
