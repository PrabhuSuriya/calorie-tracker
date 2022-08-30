import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { FoodController } from './food.controller';
import { ReportController } from './report.controller';
import { DBService } from './services/database.service';
import { FoodService } from './services/food.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [
    AuthController,
    FoodController,
    ReportController,
    UserController,
  ],
  providers: [DBService, UserService, FoodService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('food', 'report', 'user');
  }
}
