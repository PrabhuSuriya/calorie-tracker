import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { FoodController } from './food.controller';
import { DBService } from './services/database.service';
import { FoodService } from './services/food.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AuthController, FoodController],
  providers: [AppService, DBService, UserService, FoodService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('food');
  }
}
