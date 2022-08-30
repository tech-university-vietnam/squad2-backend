import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { Hotel } from '../hotels/entities/hotel.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Hotel, User])],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
