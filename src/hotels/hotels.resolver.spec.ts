import { Test, TestingModule } from '@nestjs/testing';
import { HotelsResolver } from './hotels.resolver';
import { HotelsService } from './hotels.service';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { ListHotelsInput } from './dto/list-hotel.input';

describe('HotelsResolver', () => {
  let resolver: HotelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsResolver,
        HotelsService,
        {
          provide: 'IHotelsRepository',
          useValue: {
            Create: jest.fn(),
            List: jest.fn(),
            GetByID: jest.fn(),
            Update: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<HotelsResolver>(HotelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('create a hotel resolver', () => {
    const dto = new CreateHotelInput();
    expect(resolver.create(dto)).not.toEqual(null);
  });
  it('update a hotel resolver', () => {
    const dto = new UpdateHotelInput();
    expect(resolver.update(dto)).not.toEqual(null);
  });
});
