import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GOOGLE_VERIFY_TOKEN_API } from '../common/constants';
import axios from 'axios';
import { IUsersRepository } from '../users/users.repository';

@Injectable()
export default class AuthService {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepo: IUsersRepository,
  ) {}

  async verify(token) {
    const response = await getUserIdFromGoogleToken(token);
    if (response) {
      const { user_id } = response;
      const user = await this.userRepo.GetByGID(user_id);
      if (user) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}

export const getUserIdFromGoogleToken = async (token: string) => {
  return await axios
    .get(GOOGLE_VERIFY_TOKEN_API, { params: { access_token: token } })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
};
