import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DBService } from './database.service';

@Injectable()
export class UserService {
  constructor(private dbService: DBService) {}

  async loginUser(email: string, password: string): Promise<User> {
    const user = this.dbService.user.findFirst({
      where: { email, password },
    });

    return user;
  }

  //   async getUser(id: Prisma.UserWhereUniqueInput): Promise<User | null> {
  //     return this.dbService.user.findUnique({
  //       where: id,
  //     });
  //   }

  //   async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //     return this.dbService.user.create({
  //       data,
  //     });
  //   }

  //   async updateUser(params: {
  //     where: Prisma.UserWhereUniqueInput;
  //     data: Prisma.UserUpdateInput;
  //   }): Promise<User> {
  //     const { where, data } = params;
  //     return this.dbService.user.update({
  //       data,
  //       where,
  //     });
  //   }

  //   async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //     return this.dbService.user.delete({
  //       where,
  //     });
  //   }
}
