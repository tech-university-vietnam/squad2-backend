import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';

export interface IReviewsRepository {
  Create(reviewInput: Review): Promise<Review>;
}

@Injectable()
export class ReviewsRepository implements IReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,
  ) {}

  async Create(reviewInput: Review): Promise<Review> {
    const review = this.repo.create(reviewInput);
    return await this.repo.save(review);
  }
}
