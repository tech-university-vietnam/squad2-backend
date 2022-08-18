import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(): Promise<UserEntity> {
    return this.userService.createUser();
  }

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }
}
