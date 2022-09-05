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
    return await this.paginate(listHotelsInput.paging, listHotelsInput.orderBy);
  }

  async paginate(
    options: IPaginationOptions,
    orderBy: string,
  ): Promise<Pagination<Hotel>> {
    const queryBuilder = this.repo.createQueryBuilder('c');
    if (orderBy.length > 0) {
      queryBuilder.orderBy(`c.` + orderBy, 'DESC');
    }
    return paginate<Hotel>(queryBuilder, options);
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
