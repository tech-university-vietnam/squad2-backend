import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

export enum HotelStatus {
  INVALID = 'INVALID',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}
// export class Review {
//   id: number;
//   point: number;
//   content: string;
//   createdAt: Date;
//   userId: string;
// }

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  // @Column({ array: true })
  // reviews: Review;

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
