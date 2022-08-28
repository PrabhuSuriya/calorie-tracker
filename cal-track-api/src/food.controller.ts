import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Food, User } from '@prisma/client';
import { AdminGuard } from './admin.guard';
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

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: number) {
    return await this.foodService.delete(+id);
  }
}
