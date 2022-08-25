import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum HotelStatus {
  INVALID,
  AVAILABLE = 1,
  UNAVAILABLE = 2,
}

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  reviews: Review[];

  @Column()
  images: string[];

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  price: number;

  @Column()
  facilities: string[];

  @Column()
  status: HotelStatus;

  @Column()
  description: string;
}
