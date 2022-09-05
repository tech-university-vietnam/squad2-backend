import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver('Booking')
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation('createBooking')
  create(@Args('createBookingInput') createBookingInput: CreateBookingInput) {
    return this.bookingsService.create(createBookingInput);
  }

  @Query('bookings')
  findAll() {
    return this.bookingsService.findAll();
  }

  @Query('booking')
  findOne(@Args('id') id: number) {
    return this.bookingsService.findOne(id);
  }

  @Mutation('updateBooking')
  update(@Args('updateBookingInput') updateBookingInput: UpdateBookingInput) {
    return this.bookingsService.update(
      updateBookingInput.id,
      updateBookingInput,
    );
  }
}
