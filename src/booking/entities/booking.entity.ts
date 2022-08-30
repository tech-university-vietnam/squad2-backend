import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkIn: number;

  @Column()
  checkOut: number;

  @Column()
  totalPrice: number;

  @Column()
  createdAt: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel: Hotel;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
