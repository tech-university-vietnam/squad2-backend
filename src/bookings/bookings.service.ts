import { Injectable } from '@nestjs/common';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Hotel } from '../hotels/entities/hotel.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    console.log('input', createBookingInput);
    const booking = await this.bookingRepository.create(createBookingInput);
    const hotel = await this.hotelRepository.findOneBy({
      id: createBookingInput.hotelId,
    });
    console.log('hotel', hotel);
    console.log('booking', booking);
    booking.hotel = hotel;
    booking.totalPrice = hotel.price;
    booking.checkIn = new Date(createBookingInput.checkIn);
    booking.checkOut = new Date(createBookingInput.checkOut);

    return await this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingInput: UpdateBookingInput) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
