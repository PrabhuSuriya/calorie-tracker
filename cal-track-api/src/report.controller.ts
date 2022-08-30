import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AdminGuard } from './admin.guard';
import { FoodService } from './services/food.service';
import { UserInfo } from './user-info.decorator';

@Controller('report')
@UseGuards(AdminGuard)
export class ReportController {
  constructor(private readonly foodService: FoodService) {}

  @Get('daycount')
  async getDayCount(@UserInfo() user: User) {
    const data = await this.foodService.getAll();
    const groupedData = data
      .map((f) => new Date(f.consumedTime).toISOString().split('T')[0])
      .reduce((a: any, c) => {
        if (a[c]) {
          a[c]++;
        } else {
          a[c] = 1;
        }
        return a;
      }, {});
    const result = Object.entries(groupedData).map(([date, count]) => ({
      date,
      count,
    }));
    return result;
  }

  @Get('useraggregate')
  async getAverageCalories(@UserInfo() user: User) {
    const data = await this.foodService.getAll();
    const dateLimit = getDate(-7);
    console.log(dateLimit);
    const groupedData: any = data
      .filter((f) => new Date(f.consumedTime) > dateLimit)
      .reduce((a: any, c: any) => {
        if (a[c.userId]) {
          a[c.userId].count++;
          a[c.userId].sum += c.calories;
        } else {
          a[c.userId] = { count: 1, sum: c.calories, name: c.user.name };
        }
        return a;
      }, {});
    const result = Object.entries(groupedData).map(([id, values]: any) => ({
      avg: values.sum / values.count,
      sum: values.sum,
      count: values.count,
      userId: id,
      userName: values.name,
    }));

    return result;

    // return await this.foodService.getAvgCaloriesByUser();
  }
}

function getDate(daysToAdd: number = 0) {
  var d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  return d;
}
