import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';

const bookingArray = [
  {
    id: 1,
    checkIn: '2021-01-01',
    checkOut: '2021-01-02',
    totalPrice: 100,
    guests: 2,
    createdAt: new Date(),
    hotelId: 1,
    userId: 1,
  },
];

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: 'IBookingsRepository',
          useValue: {
            Create: jest.fn().mockReturnValue(bookingArray[0]),
            List: jest.fn().mockResolvedValue(bookingArray),
            GetByID: jest.fn().mockResolvedValue(bookingArray[0]),
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
  it('should return an array of bookings', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    const bookings = await service.findAll();
    expect(findAllSpy).toHaveBeenCalled();
    expect(bookings).toEqual(bookingArray);
  });
  it('should return a booking', async () => {
    const findOneSpy = jest.spyOn(service, 'findOne');
    const booking = await service.findOne(1);
    expect(findOneSpy).toHaveBeenCalled();
    expect(booking).toEqual(bookingArray[0]);
  });
  it('should create a booking', async () => {
    const createSpy = jest.spyOn(service, 'create');
    await expect(service.create(bookingArray[0])).resolves.toEqual(
      bookingArray[0],
    );
    expect(createSpy).toHaveBeenCalled();
  });

  it('should update a booking', async () => {
    const updateSpy = jest.spyOn(service, 'update');
    await expect(service.update(1, bookingArray[0])).resolves.toEqual(true);
    expect(updateSpy).toHaveBeenCalled();
  });
});
