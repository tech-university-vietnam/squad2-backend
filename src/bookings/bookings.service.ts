import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { Booking } from './entities/booking.entity';
import { getDifferenceInDays } from '../common/time';
import { IBookingsRepository } from './bookings.repository';
import { IHotelsRepository } from '../hotels/hotels.repository';
import { IUsersRepository } from '../users/users.repository';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('IBookingsRepository')
    private readonly bookingRepository: IBookingsRepository,
    @Inject('IHotelsRepository')
    private readonly hotelRepository: IHotelsRepository,
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    if (createBookingInput.checkIn >= createBookingInput.checkOut) {
      throw new BadRequestException(
        `check in time must be before check out time`,
      );
    }
    const user = await this.userRepository.GetByID(createBookingInput.userId);
    if (!user) {
      throw new NotFoundException(
        `User #${createBookingInput.userId} not found`,
      );
    }
    const hotel = await this.hotelRepository.GetByID(
      createBookingInput.hotelId,
    );
    if (!hotel) {
      throw new NotFoundException(
        `Hotel #${createBookingInput.hotelId} not found`,
      );
    }
    const booking = new Booking();
    booking.user = user;
    booking.hotel = hotel;
    booking.guests = createBookingInput.guests;
    booking.checkIn = new Date(createBookingInput.checkIn);
    booking.checkOut = new Date(createBookingInput.checkOut);
    const days = getDifferenceInDays(booking.checkIn, booking.checkOut);
    booking.totalPrice = days * hotel.price;
    return await this.bookingRepository.Create(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.List();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.GetByID(id);
    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return booking;
  }

  async update(
    id: number,
    updateBookingInput: UpdateBookingInput,
  ): Promise<Booking> {
    return this.bookingRepository.Update(id, updateBookingInput);
  }
}
