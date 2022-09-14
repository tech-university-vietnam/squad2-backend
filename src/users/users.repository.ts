import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export interface IUsersRepository {
  Create(createUserInput: CreateUserInput): Promise<User>;
  List(): Promise<User[]>;
  GetByID(id: number): Promise<User>;
  GetByGID(gid: string): Promise<User>;
  Update(id: number, updateUserInput: UpdateUserInput): Promise<User>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async Create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.repo.create(createUserInput);
    return await this.repo.save(user);
  }

  async List(): Promise<User[]> {
    return this.repo.find();
  }

  async GetByID(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { id: id },
      relations: ['bookings'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async GetByGID(gid: string): Promise<User> {
    const user = await this.repo.findOne({
      where: { userId: gid },
      relations: ['bookings', 'bookings.hotel'],
    });
    if (!user) {
      throw new NotFoundException(`User #${gid} not found`);
    }
    return user;
  }

  async Update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.repo.preload({
      id: id,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.repo.save(user);
  }
}
