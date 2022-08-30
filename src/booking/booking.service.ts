import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';

export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly repository: Repository<Booking>,
  ) {}

  async createBooking(
    createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    const booking = await this.repository.create(createBookingInput);
    return await this.repository.save(booking);
  }

  async getBookings(): Promise<Booking[]> {
    return await this.repository.find();
  }
}
