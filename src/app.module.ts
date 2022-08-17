import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { UserController } from './modules/users/user.controller';
import { UserService } from './modules/users/user.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class AppModule {}
