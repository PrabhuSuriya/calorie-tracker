import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async get(@UserInfo() user: User) {
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

  @Get('all')
  @UseGuards(AdminGuard)
  async getAll() {
    return await this.foodService.getAll();
  }

  @Put()
  @UseGuards(AdminGuard)
  async edit(@Body() food: Food) {
    return await this.foodService.edit(food);
  }

  @Post('admin/:id')
  @UseGuards(AdminGuard)
  async addByAdmin(@Param('id') id: number, @Body() food: Food) {
    return await this.foodService.add(+id, food);
  }
}
