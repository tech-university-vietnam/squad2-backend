import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { Review } from '../../hotels/entities/review.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNDEFINED = 'UNDEFINED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.UNDEFINED,
  })
  gender: Gender;

  @Column({
    nullable: true,
  })
  userId: string;
  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
