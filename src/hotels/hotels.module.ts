import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { HotelsRepository } from './hotels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Booking])],
  providers: [
    HotelsResolver,
    HotelsService,
    {
      provide: 'IHotelsRepository',
      useClass: HotelsRepository,
    },
  ],
})
export class HotelsModule {}
