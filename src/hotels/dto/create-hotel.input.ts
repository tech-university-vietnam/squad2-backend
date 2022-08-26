import { HotelStatus } from '../entities/hotel.entity';

export class CreateHotelInput {
  name: string;
  address: string;
  images: string[];
  phone: string;
  email: string;
  price: number;
  facilities: string[];
  status: HotelStatus;
  description: string;
}
