import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { DBService } from './services/database.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AppService, DBService, UserService],
})
export class AppModule {}
