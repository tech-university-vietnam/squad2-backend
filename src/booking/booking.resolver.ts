import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './dto/create-booking.input';

@Resolver('Booking')
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation('createBooking')
  create(@Args('createHotelInput') createBookingInput: CreateBookingInput) {
    return this.bookingService.createBooking(createBookingInput);
  }

  @Query('bookings')
  findAll() {
    return this.bookingService.getBookings();
  }
}
