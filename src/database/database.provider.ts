import { DataSource } from 'typeorm';
import { UserEntity } from '../modules/users/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mck2022',
  database: 'booking_hotel',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});
