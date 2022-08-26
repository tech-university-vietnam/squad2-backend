import { MigrationInterface, QueryRunner } from 'typeorm';

export class DummyHotels1661485632654 implements MigrationInterface {
  name = 'DummyHotels1661485632654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "hotel" (id, name,  address, images, phone, email, price, facilities, status, description) VALUES
                (100, 'Prague Hotel', 'Vung Tau city', ARRAY['https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality'),
                (101, 'Imperial Hotel', 'Vung Tau city', ARRAY['https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality'),
                (102, 'Queen Hotel', 'Ho Chi Minh city', ARRAY['https://firsthotel.com.vn/wp-content/uploads/2019/06/denhatb.png', 'https://firsthotel.com.vn/wp-content/uploads/2019/06/denhatb.png'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality'),
                (103, 'Grand Lee Hotel', 'Vung Tau city', ARRAY['https://cf.bstatic.com/xdata/images/hotel/max1024x768/336840241.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality'),
                (104, 'Saigon River Hotel', 'Ho Chi Minh city', ARRAY['https://cf.bstatic.com/xdata/images/hotel/max1024x768/336840241.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'UNAVAILABLE', 'good quality'),
                (105, 'RedDoorz Luxury', 'Vung Tau city', ARRAY['https://cf.bstatic.com/xdata/images/hotel/max1024x768/336840241.jpg', 'https://seashellshotel.vn/wp-content/uploads/sites/96/2020/07/Hotel-from-above-1.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality'),
                (106, 'Mecozy Hotel', 'Ho Chi Minh city', ARRAY['https://cf.bstatic.com/xdata/images/hotel/max1024x768/336840241.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'UNAVAILABLE', 'good quality'),
                (107, 'River View Hotel', 'Ho Chi Minh city', ARRAY['https://seashellshotel.vn/wp-content/uploads/sites/96/2020/07/Hotel-from-above-1.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality'),
                (108, 'Cherry Hotel', 'Da Lat city', ARRAY['https://firsthotel.com.vn/wp-content/uploads/2019/06/denhatb.png'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'UNAVAILABLE', 'good quality'),
                (109, 'Lucky Hotel', 'Da lat city', ARRAY['https://s3.go2joy.vn/350w/hotel/3045/118_1622789303_60b9ccb745273.jpg'] , '0905984573', 'prague@gmail.com', 700000, ARRAY['wifi'], 'AVAILABLE', 'good quality');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
