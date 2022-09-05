import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Gender } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.usersRepository.Create(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.List();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.GetByID(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByGid(gid: string): Promise<User | undefined> {
    const user = await this.usersRepository.GetByGID(gid);
    if (!user) {
      throw new NotFoundException(`User #${gid} not found`);
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.usersRepository.Update(id, updateUserInput);
  }
}
