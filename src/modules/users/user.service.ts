import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { IUserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repo: IUserRepository) {}

  createUser(user: UserEntity): Promise<UserEntity> {
    return this.repo.createUser(user);
  }

  getUsers(): Promise<UserEntity[]> {
    return this.repo.getUsers();
  }

  getUserById(id: string): Promise<UserEntity> {
    return this.repo.getUserById(id);
  }

  updateUser(user: UserEntity) {
    return this.repo.updateUserById(user);
  }

  deleteUser(id: string) {
    return this.repo.deleteUser(id);
  }
}
