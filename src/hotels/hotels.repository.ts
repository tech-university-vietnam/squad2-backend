import { Repository } from 'typeorm';
import { Hotel, HotelStatus } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { ListHotelsInput } from './dto/list-hotel.input';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { InjectRepository } from '@nestjs/typeorm';

export interface IHotelsRepository {
  Create(createHotelInput: CreateHotelInput): Promise<Hotel>;
  List(listHotelsInput: ListHotelsInput): Promise<Pagination<Hotel>>;
  GetByID(id: number): Promise<Hotel>;
  Update(id: number, updateHotelInput: UpdateHotelInput): Promise<Hotel>;
}

@Injectable()
export class HotelsRepository implements IHotelsRepository {
  constructor(
    @InjectRepository(Hotel)
    private readonly repo: Repository<Hotel>,
  ) {}

  async Create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    const hotel = this.repo.create(createHotelInput);
    return await this.repo.save(hotel);
  }

  async List(listHotelsInput: ListHotelsInput): Promise<Pagination<Hotel>> {
    return await this.paginate(listHotelsInput);
  }

  async paginate(options: ListHotelsInput): Promise<Pagination<Hotel>> {
    const queryBuilder = this.repo.createQueryBuilder('c');
    if (options.orderBy) {
      queryBuilder.orderBy(`c.` + options.orderBy, 'DESC');
    }
    if (options.address) {
      const address = options.address;
      queryBuilder.where(`c.address like '%` + address + `%'`);
    }
    if (options.name) {
      const name = options.name;
      queryBuilder.where(`c.name like '%` + name + `%'`);
    }
    return paginate<Hotel>(queryBuilder, options.paging);
  }

  async GetByID(id: number): Promise<Hotel> {
    const hotel = await this.repo.findOneBy({ id: id });
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return hotel;
  }

  async Update(id: number, updateHotelInput: UpdateHotelInput): Promise<Hotel> {
    const hotel = await this.repo.preload({
      id: id,
      ...updateHotelInput,
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return this.repo.save(hotel);
  }
}
