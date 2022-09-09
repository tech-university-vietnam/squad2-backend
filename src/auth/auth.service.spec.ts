import { TestingModule, Test } from '@nestjs/testing';
import AuthService from './auth.service';
import { getUserIdFromGoogleToken } from './auth.service';

describe('Auth Services', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'IUsersRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should verify the token', async () => {
    const verifySpy = jest.spyOn(service, 'verify');
    await expect(service.verify('token')).rejects.toThrow();
    expect(verifySpy).toHaveBeenCalled();
  });

  it('should return user id from google token', async () => {
    const response = await getUserIdFromGoogleToken('token');
    expect(response).toBeUndefined();
  });
});
