import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';

const reviewArray = [
  {
    id: '1',
    rating: 5,
    comment: 'This is a comment',
    createdAt: new Date(),
    hotelId: 1,
    userId: 1,
    point: 1,
    content: 'This is a content',
  },
];
describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: 'IReviewsRepository',
          useValue: {
            Create: jest.fn().mockReturnValue(reviewArray[0]),
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

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a review', async () => {
    const createSpy = jest.spyOn(service, 'create');
    await expect(service.create(reviewArray[0])).resolves.toEqual(
      reviewArray[0],
    );
    expect(createSpy).toHaveBeenCalled();
  });
});
