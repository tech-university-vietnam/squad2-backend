import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HotelsService } from './hotels.service';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { ListHotelsInput } from './dto/list-hotel.input';
import { ReviewInput } from './dto/hotel.input';
import { ReviewsService } from './reviews/reviews.service';

@Resolver('Hotel')
export class HotelsResolver {
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Mutation('createHotel')
  create(@Args('createHotelInput') createHotelInput: CreateHotelInput) {
    return this.hotelsService.create(createHotelInput);
  }

  @Query('hotels')
  findAll(@Args('listHotelsInput') listHotelsInput: ListHotelsInput) {
    return this.hotelsService.findAll(listHotelsInput);
  }

  @Query('hotel')
  findOne(@Args('id') id: number) {
    return this.hotelsService.findOne(id);
  }

  @Mutation('updateHotel')
  update(@Args('updateHotelInput') updateHotelInput: UpdateHotelInput) {
    return this.hotelsService.update(updateHotelInput.id, updateHotelInput);
  }

  @Mutation('createReview')
  createReview(@Args('createReviewInput') reviewInput: ReviewInput) {
    console.log('input nha', reviewInput);
    return this.reviewsService.create(reviewInput);
  }
}
