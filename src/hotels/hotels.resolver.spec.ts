import { Test, TestingModule } from '@nestjs/testing';
import { HotelsResolver } from './hotels.resolver';
import { HotelsService } from './hotels.service';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { ListHotelsInput } from './dto/list-hotel.input';
import { HotelStatus } from './entities/hotel.entity';
import { ReviewsService } from './reviews/reviews.service';

describe('HotelsResolver', () => {
  let resolver: HotelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsResolver,
        {
          provide: HotelsService,
          useFactory: () => ({
            findAll: jest.fn(() => [
              {
                id: 1,
                name: 'Hotel 1',
                address: 'Address 1',
                phone: '123456789',
                email: 'abc@gmail.com',
                price: 100,
                facilities: ['Facility 1', 'Facility 2'],
                status: HotelStatus.AVAILABLE,
                description: 'Description 1',
                images: [],
              },
              {
                id: 2,
                name: 'Hotel 2',
                address: 'Address 2',
                phone: '123456789',
                email: '123@gmail.com',
                price: 200,
                facilities: ['Facility 3', 'Facility 4'],
                status: HotelStatus.AVAILABLE,
                description: 'Description 2',
                images: [],
              },
            ]),
          }),
        },
        {
          provide: ReviewsService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    resolver = module.get<HotelsResolver>(HotelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should return an array of hotels', async () => {
    const hotels = await resolver.findAll({
      paging: { page: 1, limit: 10 },
      orderBy: 'ASC',
      filterBy: 'name',
    });
    expect(hotels).toEqual([
      {
        id: 1,
        name: 'Hotel 1',
        address: 'Address 1',
        phone: '123456789',
        email: 'abc@gmail.com',
        price: 100,
        facilities: ['Facility 1', 'Facility 2'],
        status: HotelStatus.AVAILABLE,
        description: 'Description 1',
        images: [],
      },
      {
        id: 2,
        name: 'Hotel 2',
        address: 'Address 2',
        phone: '123456789',
        email: '123@gmail.com',
        price: 200,
        facilities: ['Facility 3', 'Facility 4'],
        status: HotelStatus.AVAILABLE,
        description: 'Description 2',
        images: [],
      },
    ]);
  });
});
