import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ListHotelsInput } from './dto/list-hotel.input';
import { setDefaultPagination } from '../common/pagination';
import { IHotelsRepository } from './hotels.repository';

@Injectable()
export class HotelsService {
  constructor(
    @Inject('IHotelsRepository')
    private readonly hotelsRepository: IHotelsRepository,
  ) {}

  async create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    return await this.hotelsRepository.Create(createHotelInput);
  }

  async findAll(listHotelsInput: ListHotelsInput): Promise<Pagination<Hotel>> {
    let paging = listHotelsInput.paging;
    paging = setDefaultPagination(paging);
    listHotelsInput.paging = paging;
    return await this.hotelsRepository.List(listHotelsInput);
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelsRepository.GetByID(id);
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelInput: UpdateHotelInput): Promise<Hotel> {
    const hotel = await this.hotelsRepository.Update(id, updateHotelInput);
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return hotel;
  }
}
