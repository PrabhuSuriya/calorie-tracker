import { Injectable } from '@nestjs/common';
import { Food, Prisma } from '@prisma/client';
import { DBService } from './database.service';

@Injectable()
export class FoodService {
  constructor(private dbService: DBService) {}

  async get(userId: number): Promise<Food[]> {
    return this.dbService.food.findMany({
      where: {
        userId: {
          equals: +userId,
        },
      },
      orderBy: [{ consumedTime: 'desc' }],
    });
  }

  async add(userId: number, food: Food): Promise<Food> {
    const data = { ...food, userId };
    return this.dbService.food.create({
      data,
    });
  }

  async delete(id: number): Promise<Food> {
    return this.dbService.food.delete({
      where: { id },
    });
  }

  
}
