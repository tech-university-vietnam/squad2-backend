import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel: Hotel;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
