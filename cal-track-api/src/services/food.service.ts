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
    });
  }

  async add(userId: number, food: Food): Promise<Food> {
    const data = { ...food, userId };
    return this.dbService.food.create({
      data,
    });
  }

  //   async getFood(id: Prisma.FoodWhereUniqueInput): Promise<Food | null> {
  //     return this.dbService.food.findUnique({
  //       where: id,
  //     });
  //   }

  //   async createFood(data: Prisma.FoodCreateInput): Promise<Food> {
  //     return this.dbService.food.create({
  //       data,
  //     });
  //   }

  //   async updateFood(params: {
  //     where: Prisma.FoodWhereUniqueInput;
  //     data: Prisma.FoodUpdateInput;
  //   }): Promise<Food> {
  //     const { where, data } = params;
  //     return this.dbService.food.update({
  //       data,
  //       where,
  //     });
  //   }

  //   async deleteFood(where: Prisma.FoodWhereUniqueInput): Promise<Food> {
  //     return this.dbService.food.delete({
  //       where,
  //     });
  //   }
}
