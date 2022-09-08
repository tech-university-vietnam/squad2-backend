export class HotelInput {
  id: number;
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

export class ReviewInput {
  id: string;
  point: number;
  content: string;
  userId: number;
  hotelId: number;
}

enum HotelStatus {
  INVALID,
  AVAILABLE = 1,
  UNAVAILABLE = 2,
}
