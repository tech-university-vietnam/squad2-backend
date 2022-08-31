import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Hotel } from '../hotels/entities/hotel.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    if (createBookingInput.checkIn >= createBookingInput.checkOut) {
      throw new BadRequestException(
        `check in time must be before check out time`,
      );
    }
    const booking = await this.bookingRepository.create(createBookingInput);
    const user = await this.userRepository.findOneBy({
      id: createBookingInput.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User #${createBookingInput.userId} not found`,
      );
    }
    const hotel = await this.hotelRepository.findOneBy({
      id: createBookingInput.hotelId,
    });
    if (!hotel) {
      throw new NotFoundException(
        `Hotel #${createBookingInput.hotelId} not found`,
      );
    }
    booking.user = user;
    booking.hotel = hotel;
    booking.totalPrice = hotel.price;
    booking.checkIn = new Date(createBookingInput.checkIn);
    booking.checkOut = new Date(createBookingInput.checkOut);
    return await this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find({ relations: ['hotel', 'user'] });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ id: id });
    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return booking;
  }

  async update(
    id: number,
    updateBookingInput: UpdateBookingInput,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.preload({
      id: id,
      ...updateBookingInput,
    });
    if (!booking) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return this.bookingRepository.save(booking);
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
