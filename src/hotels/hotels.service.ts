import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel, HotelStatus } from './entities/hotel.entity';

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

  async findAll(): Promise<Hotel[]> {
    return this.hotelsRepository.find();
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
