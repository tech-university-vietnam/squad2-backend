import { Repository } from 'typeorm';
import { Gender } from './../graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import AuthService from '../auth/auth.service';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        AuthService,
        {
          provide: 'IUsersRepository',
          useValue: {},
        },
        {
          provide: UsersService,
          useFactory: () => ({
            findAll: jest.fn(() => [
              {
                id: 1,
                firstName: 'User 1',
                lastName: 'User 1',
                email: 'abc@gmail.com',
                phone: '123456789',
                gender: Gender.MALE,
                userId: '1232342',
              },
            ]),
          }),
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should return an array of users', async () => {
    const users = await resolver.findAll();
    expect(users).toEqual([
      {
        id: 1,
        firstName: 'User 1',
        lastName: 'User 1',
        email: 'abc@gmail.com',
        phone: '123456789',
        gender: Gender.MALE,
        userId: '1232342',
      },
    ]);
  });
});
