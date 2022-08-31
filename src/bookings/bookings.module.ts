import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Hotel } from '../hotels/entities/hotel.entity';
import { User } from '../users/entities/user.entity';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Hotel, User]), AuthModule],
  providers: [BookingsService, BookingsResolver],
})
export class BookingsModule {}
