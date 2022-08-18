import { DataSource } from 'typeorm';
import { UserEntity } from '../modules/users/user.entity';

export const AppDataSource = new DataSource({
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

AppDataSource.initialize()
  .then(() => {
    console.log('init datasource successfully');
  })
  .catch((error) => console.log('init datasource failed', error));
