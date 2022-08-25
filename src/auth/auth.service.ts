import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GOOGLE_VERIFY_TOKEN_API } from '../common/constants';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async verify(token) {
    const response = await axios
      .get(GOOGLE_VERIFY_TOKEN_API, { params: { access_token: token } })
      .then((response) => {
        console.log('verify success', response.data);
        return response.data;
      })
      .catch((err) => {
        console.log('verify failed', err);
        throw new UnauthorizedException();
      });
    if (response) {
      const { user_id } = response;
      const user = await this.userRepo.findOneBy({
        userId: user_id,
      });
      if (user) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
