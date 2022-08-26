import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Hotel } from './src/hotels/entities/hotel.entity';
import { DummyHotels1661485632654 } from './src/migrations/1661485632654-DummyHotels';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mck2022',
  database: 'booking_hotel',
  entities: [User, Hotel],
  migrations: [DummyHotels1661485632654],
});
