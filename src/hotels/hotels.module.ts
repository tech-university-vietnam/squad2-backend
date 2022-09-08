import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { HotelsRepository } from './hotels.repository';
import { ReviewsRepository } from './reviews/reviews.repository';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews/reviews.service';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Booking, Review, User])],
  providers: [
    HotelsResolver,
    HotelsService,
    ReviewsService,
    {
      provide: 'IHotelsRepository',
      useClass: HotelsRepository,
    },
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IReviewsRepository',
      useClass: ReviewsRepository,
    },
  ],
})
export class HotelsModule {}
