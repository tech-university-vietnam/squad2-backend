import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel, HotelStatus } from './entities/hotel.entity';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ListHotelsInput } from './dto/list-hotel.input';
import { PaginationInput } from '../common/pagination';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
  ) {}

  async create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    const hotel = this.hotelsRepository.create(createHotelInput);
    return await this.hotelsRepository.save(hotel);
  }

  async findAll(listHotelsInput: ListHotelsInput): Promise<Pagination<Hotel>> {
    let paging = listHotelsInput.paging;
    console.log('paging input', listHotelsInput);
    paging = this.setDefaultPagination(paging);
    return await this.paginate(paging, listHotelsInput.orderBy);
  }

  async paginate(
    options: IPaginationOptions,
    orderBy: string,
  ): Promise<Pagination<Hotel>> {
    const queryBuilder = this.hotelsRepository.createQueryBuilder('c');
    if (orderBy.length > 0) {
      queryBuilder.orderBy(`c.` + orderBy, 'DESC');
    }
    return paginate<Hotel>(queryBuilder, options);
  }

  setDefaultPagination(paging: PaginationInput): PaginationInput {
    if (paging.page <= 0) {
      paging.page = 1;
    }
    if (paging.limit <= 0) {
      paging.limit = 10;
    }
    return paging;
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelsRepository.findOneBy({ id: id });
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelInput: UpdateHotelInput): Promise<Hotel> {
    const hotel = await this.hotelsRepository.preload({
      id: id,
      ...updateHotelInput,
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return this.hotelsRepository.save(hotel);
  }

  async remove(id: number): Promise<Hotel> {
    const hotel = await this.findOne(id);
    await this.hotelsRepository.remove(hotel);
    return {
      id: id,
      name: '',
      address: '',
      // reviews: [],
      images: [],
      phone: '',
      email: '',
      price: 0,
      facilities: [],
      status: HotelStatus.INVALID,
      description: '',
    };
  }
}
