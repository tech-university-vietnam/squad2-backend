import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/database.provider';

export interface IUserRepository {
  createUser(user: UserEntity);
  getUserById(id: string): Promise<UserEntity>;
  getUsers(): Promise<UserEntity[]>;
  updateUserById(user: UserEntity);
  deleteUser(id: string);
}

export class UserRepository implements IUserRepository {
  private repo: Repository<UserEntity>;
  constructor() {
    this.repo = AppDataSource.getRepository(UserEntity);
  }

  createUser(user: UserEntity) {
    console.log('user input', user);
    user.email = 'lam-ngo';
    user.firstName = 'aaa';
    user.lastName = 'bbb';
    user.phone = '1234';
    user.avatar = 'url';
    user.gender = 'male';

    this.repo
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

  deleteUser(id: string) {
    return this.repo.delete(id);
  }

  getUserById(id: string): Promise<UserEntity> {
    return this.repo.findOneById(id);
  }

  getUsers(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  updateUserById(user: UserEntity) {
    console.log('user input', user);
    return this.repo.save(user);
  }
}
