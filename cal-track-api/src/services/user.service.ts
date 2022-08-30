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

  async inviteUser(name: string, email: string): Promise<User> {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return await this.dbService.user.create({
        data: {
          name,
          email,
          calorieLimit: 2100,
          isAdmin: false,
          password: generatePassword(),
        },
      });
    }

    return null;
  }
}

function generatePassword() {
  var pass = '';
  var str = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 1; i <= 4; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
}
