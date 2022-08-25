import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GOOGLE_VERIFY_TOKEN_API } from '../common/constants';
import axios from 'axios';
import { UsersRepository } from '../users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepo: UsersRepository,
  ) {}

  async verify(token) {
    const url = GOOGLE_VERIFY_TOKEN_API.replace('{access_token}', token);
    const response = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log('verify failed', err);
        throw new UnauthorizedException();
      });
    if (response) {
      const { user_id } = response;
      const user = await this.userRepo.findOneBy({
        // TODO: check user_id
        firstName: user_id,
      });
      if (user) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
