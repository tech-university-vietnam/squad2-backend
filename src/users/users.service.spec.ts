import { Gender } from './../graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const userArray = [
  {
    id: 1,
    firstName: 'User 1',
    lastName: 'User 1',
    email: 'abc@gmail.com',
    phone: '123456789',
    gender: Gender.MALE,
    userId: '1232342',
  },
];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'IUsersRepository',
          useValue: {
            Create: jest.fn().mockReturnValue(userArray[0]),
            List: jest.fn().mockResolvedValue(userArray),
            GetByID: jest.fn().mockResolvedValue(userArray[0]),
            Update: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of users', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    const users = await service.findAll();
    expect(findAllSpy).toHaveBeenCalled();
    expect(users).toEqual(userArray);
  });
  it('should return a user', async () => {
    const findOneSpy = jest.spyOn(service, 'findOne');
    const user = await service.findOne(1);
    expect(findOneSpy).toHaveBeenCalled();
    expect(user).toEqual(userArray[0]);
  });
  it('should create a user', async () => {
    const createSpy = jest.spyOn(service, 'create');
    await expect(service.create(userArray[0])).resolves.toEqual(userArray[0]);
    expect(createSpy).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const updateSpy = jest.spyOn(service, 'update');
    const user = await service.update(1, userArray[0]);
    expect(updateSpy).toHaveBeenCalled();
    expect(user).toEqual(true);
  });
});
