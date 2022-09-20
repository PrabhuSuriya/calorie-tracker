import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './services/user.service';

@Controller('echo')
export class EchoController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async post(@Body() body) {
    return body;
  }

  @Get('/:text')
  async get(@Param('text') text) {
    return text;
  }

  @Get('greet/:name')
  async greet(@Param('name') name) {
    return `Hello ${name}! - ${new Date()}`;
  }
}
