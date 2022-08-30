import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
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

  async getAll(): Promise<Food[]> {
    return this.dbService.food.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ userId: 'asc' }, { consumedTime: 'desc' }],
    });
  }

  async add(userId: number, food: Food): Promise<Food> {
    const data = { ...food, userId };
    return this.dbService.food.create({
      data,
    });
  }

  async edit(food: Food): Promise<Food> {
    const { name, calories, consumedTime, imageUrl } = food;
    return this.dbService.food.update({
      where: {
        id: food.id,
      },
      data: {
        name,
        calories,
        consumedTime,
        imageUrl,
      },
    });
  }

  async delete(id: number): Promise<Food> {
    return this.dbService.food.delete({
      where: { id },
    });
  }
}
