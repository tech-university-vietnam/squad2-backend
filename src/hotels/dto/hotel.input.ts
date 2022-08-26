export class HotelInput {
  id: number;
  name: string;
  address: string;
  reviews: Review[];
  images: string[];
  phone: string;
  email: string;
  price: number;
  facilities: string[];
  status: HotelStatus;
  description: string;
}

class Review {
  id: string;
  point: number;
  content: string;
  createdAt: Date;
  userId: string;
}

enum HotelStatus {
  INVALID,
  AVAILABLE = 1,
  UNAVAILABLE = 2,
}
