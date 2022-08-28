import { Controller, Get, Param, Response } from '@nestjs/common';
import { User } from '@prisma/client';
import { FoodService } from './services/food.service';
import { UserInfo } from './user-info.decorator';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getAll(@UserInfo() user: User) {
    return await this.foodService.get(user.id);
  }
}
