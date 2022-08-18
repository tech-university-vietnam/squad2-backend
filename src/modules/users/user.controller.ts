import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserTransformation } from '../../common/transform/user';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userTransform: UserTransformation,
  ) {}

  @Post()
  async createUser(@Body() user: UserDto): Promise<UserEntity> {
    const userEntity = this.userTransform.DTOToEntity(user);
    return this.userService.createUser(userEntity);
  }

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }
}
