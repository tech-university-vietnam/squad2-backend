import { CreateBookingInput } from './dto/create-booking.input';
import { Booking } from './entities/booking.entity';
import { UpdateBookingInput } from './dto/update-booking.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface IBookingsRepository {
  Create(createBookingInput: Booking): Promise<Booking>;
  List(): Promise<Booking[]>;
  GetByID(id: number): Promise<Booking>;
  Update(id: number, updateBookingInput: UpdateBookingInput): Promise<Booking>;
}

@Injectable()
export class BookingsRepository implements IBookingsRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,
  ) {}

  async Create(booking: Booking): Promise<Booking> {
    return await this.repo.save(booking);
  }

  async GetByID(id: number): Promise<Booking> {
    const booking = await this.repo.findOneBy({ id: id });
    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return booking;
  }

  async List(): Promise<Booking[]> {
    return await this.repo.find({
      relations: ['hotel', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async Update(
    id: number,
    updateBookingInput: UpdateBookingInput,
  ): Promise<Booking> {
    const booking = await this.repo.preload({
      id: id,
      ...updateBookingInput,
    });
    if (!booking) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return this.repo.save(booking);
  }
}
