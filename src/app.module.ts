import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { Hotel } from './hotels/entities/hotel.entity';
import { DummyHotels1661485632654 } from './migrations/1661485632654-DummyHotels';
import { DateResolver } from 'graphql-scalars';
import * as dotenv from 'dotenv';
import { getUserIdFromGoogleToken } from './auth/auth.service';
import { Booking } from './bookings/entities/booking.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Review } from './hotels/entities/review.entity';

dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: async ({ req }) => {
        const response = await getUserIdFromGoogleToken(
          req?.headers?.authorization,
        );
        if (response?.user_id) {
          req.headers.current_gid = response?.user_id;
        }
        return { req };
      },
      resolvers: { Date: DateResolver },
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [User, Hotel, Booking, Review],
      migrations: [DummyHotels1661485632654],
    }),
    UsersModule,
    AuthModule,
    HotelsModule,
    BookingsModule,
  ],
})
export class AppModule {}
