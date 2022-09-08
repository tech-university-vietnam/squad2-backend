import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from './hotels.service';
import { HotelStatus } from './entities/hotel.entity';

const hotelArray = [
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
];

describe('HotelsService', () => {
  let service: HotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsService,
        {
          provide: 'IHotelsRepository',
          useValue: {
            Create: jest.fn().mockReturnValue(hotelArray[0]),
            List: jest.fn().mockResolvedValue(hotelArray),
            GetByID: jest.fn().mockResolvedValue(hotelArray[0]),
            Update: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('find All', () => {
    it('should return an array of hotels', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const hotels = await service.findAll({
        paging: { page: 1, limit: 10 },
        orderBy: 'ASC',
        filterBy: 'name',
      });
      expect(hotels).toEqual(hotelArray);
      expect(findAllSpy).toHaveBeenCalledWith({
        paging: { page: 1, limit: 10 },
        orderBy: 'ASC',
        filterBy: 'name',
      });
    });
  });

  describe('create one', () => {
    it('should create a hotel', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await expect(
        service.create({
          name: 'Hotel 1',
          address: 'Address 1',
          phone: '123456789',
          email: 'abc@gmail.com',
          price: 100,
          facilities: ['Facility 1', 'Facility 2'],
          status: HotelStatus.AVAILABLE,
          description: 'Description 1',
          images: [],
        }),
      ).resolves.toEqual(hotelArray[0]);
      expect(createSpy).toHaveBeenCalledWith({
        name: 'Hotel 1',
        address: 'Address 1',
        phone: '123456789',
        email: 'abc@gmail.com',
        price: 100,
        facilities: ['Facility 1', 'Facility 2'],
        status: HotelStatus.AVAILABLE,
        description: 'Description 1',
        images: [],
      });
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('find One', () => {
    it('should return a hotel', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const hotel = await service.findOne(1);
      expect(hotel).toEqual(hotelArray[0]);
      expect(findOneSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('update one', () => {
    it('should update a hotel', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      expect(
        service.update(1, {
          id: 1,
          name: 'Hotel 1',
          address: 'Address 1',
          phone: '123456789',
          email: '',
        }),
      );
      expect(updateSpy).toHaveBeenCalledWith(1, {
        id: 1,
        name: 'Hotel 1',
        address: 'Address 1',
        phone: '123456789',
        email: '',
      });
      expect(updateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
