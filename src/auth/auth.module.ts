import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import AuthService from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService],
  exports: [AuthService],
})
export default class AuthModule {}
