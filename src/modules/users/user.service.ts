import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { AppDataSource } from '../../database/database.provider';

const repo = AppDataSource.manager.getRepository(UserEntity);

@Injectable()
export class UserService {
  async createUser(): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = 'lam-ngo';
    user.firstName = 'aaa';
    user.lastName = 'bbb';
    user.phone = '1234';
    user.avatar = 'url';
    user.gender = 'male';

    repo
      .save(user)
      .then((r) => {
        console.log('insert user successfully');
        return r;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });

    return null;
  }

  async getUsers(): Promise<UserEntity[]> {
    return repo.find();
  }
}
