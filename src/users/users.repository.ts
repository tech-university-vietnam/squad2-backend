import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

export interface IUserRepository {
  createUser(createUserInput: CreateUserInput): Promise<User>;
  getUserById(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
}

@EntityRepository(User)
export class UsersRepository
  extends Repository<User>
  implements IUserRepository
{
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = this.create(createUserInput);
    return await this.save(user);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.findOneBy({ id: id });
    if (!user) {
      return null;
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.find();
    if (users.length) {
      return null;
    }
    return users;
  }
}
