import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HotelStatus } from '../src/hotels/entities/hotel.entity';

const hotelArray = [
  {
    id: 1,
    name: 'Hotel 1',
    address: 'Address 1',
    phone: '123456789',
    email: 'abc@gmail.com',
    price: 100,
    facilities: ['Facility 1', 'Facility 2'],
    status: HotelStatus.AVAILABLE,
    description: 'Description 1',
    images: [],
  },
  {
    id: 2,
    name: 'Hotel 2',
    address: 'Address 2',
    phone: '123456789',
    email: '123@gmail.com',
    price: 200,
    facilities: ['Facility 3', 'Facility 4'],
    status: HotelStatus.AVAILABLE,
    description: 'Description 2',
    images: [],
  },
];
const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('hotels', () => {
      it('should create a hotel', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `mutation{
              createHotel(createHotelInput:{
                name: "Hotel test"
                address: "address test"
                phone: "123423534"
                email: "test@gmail.com"
                price: 900
                description: "astra"
                images: ["234234","234"]
                facilities: "jlksdfjkl"
                status: UNAVAILABLE
              }){
                name
                id
                address
              }
            } `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createHotel.name).toEqual('Hotel test');
            expect(res.body.data.createHotel.address).toEqual('address test');
          });
      });

      it('should return an array of hotels', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `query{
              hotels(
                listHotelsInput: 
                {
                  paging: 
                  {
                    limit:10
                    page:1
                  } 
                  orderBy : "id"
                })
              {
                items {
                  name
                  id
                  address
                  images
                  phone
                  email
                  price
                  facilities
                  status
                  description
                }
                
              }
            }`,
          })
          .expect(200)
          .expect((res) => {
            console.log(res.body.data.hotels.items);
            expect(res.body.data.hotels.items).not.toEqual(null);
          });
      });
    });
  });
});
