import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Review } from './review.entity';

export enum HotelStatus {
  INVALID = 'INVALID',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Review, (review) => review.hotel)
  reviews: Review[];

  @Column('text', { array: true })
  images: string[];

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  price: number;

  @Column('text', { array: true })
  facilities: string[];

  @Column()
  status: HotelStatus;

  @Column()
  description: string;

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings: Booking[];
}
