import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IUserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: IUserRepository,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.repo.createUser(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return this.repo.getUsers();
  }

  async findOne(id: number): Promise<User> {
    return this.repo.getUserById(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
