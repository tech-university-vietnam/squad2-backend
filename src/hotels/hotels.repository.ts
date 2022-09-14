import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { ListHotelsInput } from './dto/list-hotel.input';
import {
  Pagination,
  paginate,
  PaginationTypeEnum,
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
    return await this.pagination(listHotelsInput);
  }

  async pagination(options: ListHotelsInput): Promise<Pagination<Hotel>> {
    const queryBuilder = this.repo.createQueryBuilder('c');
    if (options.orderBy) {
      queryBuilder.orderBy(`c.` + options.orderBy, 'DESC');
    }
    if (options.filterBy) {
      const cond = options.filterBy;
      const upperCond = options.filterBy.toUpperCase();
      const lowerCond = options.filterBy.toLowerCase();
      const queryString =
        `c.address like '%` +
        upperCond +
        `%' OR c.name like '%` +
        upperCond +
        `%' OR c.address like '%` +
        cond +
        `%' OR c.name like '%` +
        cond +
        `%' OR c.address like '%` +
        lowerCond +
        `%' OR c.name like '%` +
        lowerCond +
        `%'`;
      queryBuilder.orWhere(queryString);
    }
    queryBuilder.leftJoinAndSelect('c.reviews', 'reviews');
    queryBuilder.leftJoinAndSelect('reviews.user', 'user');
    const totalItems = await queryBuilder.getCount();
    return await paginate<Hotel>(queryBuilder, {
      limit: options.paging.limit,
      page: options.paging.page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
        const totalPages = Math.round(totalItems / itemsPerPage);
        return {
          currentPage,
          itemCount,
          itemsPerPage,
          totalItems,
          totalPages: totalPages === 0 ? 1 : totalPages,
        };
      },
    });
  }

  async GetByID(id: number): Promise<Hotel> {
    const hotel = await this.repo.findOne({
      where: { id: id },
      relations: ['reviews', 'reviews.user'],
    });
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
