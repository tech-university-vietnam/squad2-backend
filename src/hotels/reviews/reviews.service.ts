import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IReviewsRepository } from './reviews.repository';
import { ReviewInput } from '../dto/hotel.input';
import { Review } from '../entities/review.entity';
import { IHotelsRepository } from '../hotels.repository';
import { IUsersRepository } from '../../users/users.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject('IReviewsRepository')
    private readonly reviewRepository: IReviewsRepository,
    @Inject('IHotelsRepository')
    private readonly hotelRepository: IHotelsRepository,
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(reviewInput: ReviewInput): Promise<Review> {
    const user = await this.userRepository.GetByID(reviewInput.userId);
    if (!user) {
      throw new NotFoundException(`User #${reviewInput.userId} not found`);
    }
    const hotel = await this.hotelRepository.GetByID(reviewInput.hotelId);
    if (!hotel) {
      throw new NotFoundException(`Hotel #${reviewInput.hotelId} not found`);
    }
    const review = new Review();
    review.user = user;
    review.hotel = hotel;
    review.point = reviewInput.point;
    review.content = reviewInput.content;
    return await this.reviewRepository.Create(review);
  }
}
