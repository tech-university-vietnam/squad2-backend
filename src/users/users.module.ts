import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { Booking } from '../bookings/entities/booking.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Booking]), AuthModule],
  providers: [
    UsersResolver,
    UsersService,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
