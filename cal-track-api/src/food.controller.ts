import { Body, Controller, Get, Post } from '@nestjs/common';
import { Food, User } from '@prisma/client';
import { FoodService } from './services/food.service';
import { UserInfo } from './user-info.decorator';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getAll(@UserInfo() user: User) {
    return await this.foodService.get(user.id);
  }

  @Post()
  async add(@UserInfo() user: User, @Body() food: Food) {
    return await this.foodService.add(user.id, food);
  }
}
