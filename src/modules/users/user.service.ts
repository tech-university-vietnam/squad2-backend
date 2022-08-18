import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @Inject()
    private repository: Repository<UserEntity>) {}

  createUser(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  getUsers(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  getUserById(id: string): Promise<UserEntity> {
    return this.repository.findOneById(id);
  }

  updateUser(user: UserEntity) {
    return this.repository.save(user);
  }

  deleteUser(id: string) {
    return this.repository.delete(id);
  }
}
