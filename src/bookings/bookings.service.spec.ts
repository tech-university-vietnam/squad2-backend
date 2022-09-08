import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: 'IBookingsRepository',
          useValue: {
            Create: jest.fn().mockReturnValue({}),
            List: jest.fn().mockResolvedValue([]),
            GetByID: jest.fn().mockResolvedValue({}),
            Update: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: 'IHotelsRepository',
          useValue: {
            GetByID: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: 'IUsersRepository',
          useValue: {
            GetByID: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
