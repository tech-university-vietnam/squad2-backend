import { Gender } from '../entities/user.entity';
export class CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  userId: string;
}
