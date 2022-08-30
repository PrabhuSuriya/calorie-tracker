import { Injectable } from '@nestjs/common';
import { Food, prisma, Prisma } from '@prisma/client';
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
    console.log(data);
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

  // async getAvgCaloriesByUser(): Promise<any> {
  //   // return this.dbService.food.groupBy({
  //   //   by: ['userId'],
  //   //   _avg: {
  //   //     calories: true,
  //   //   },
  //   //   where: {
  //   //     consumedTime: {
  //   //       // lte: new Date(),
  //   //       gte: new Date(new Date().setDate(-7)),
  //   //     },
  //   //   },
  //   //   orderBy: [{ userId: 'asc' }],
  //   // });
  //   console.log(new Date(new Date().setDate(-7)));
  //   return this.dbService.food.findMany({
  //     // by: ['userId'],
  //     // _avg: {
  //     //   calories: true,
  //     // },
  //     where: {
  //       consumedTime: {
  //         // lte: new Date(),
  //         gt: new Date(new Date().setDate(-7)),
  //       },
  //     },
  //     // orderBy: [{ userId: 'asc' }],
  //   });
  // }

  // async getAvgCaloriesByUser(): Promise<any> {
  //   // return prisma.$query this.dbService.$queryRaw(`SELECT * FROM Food`);

  //   // const startDate = new Date(new Date().setDate(-));
  //   // const endDate = new Date();
  //   return await this.dbService.$queryRaw(Prisma.sql`
  //   SELECT *
  //   FROM Food
  //    -- WHERE strftime('%Y%m%d', consumedTime) > '20220820'
  //   `);
  // }
}
