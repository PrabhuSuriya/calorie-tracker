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
}
