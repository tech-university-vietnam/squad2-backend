import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsRepository extends Repository<Hotel> {
  async paginate(
    options: IPaginationOptions,
    orderBy: string,
  ): Promise<Pagination<Hotel>> {
    const queryBuilder = this.createQueryBuilder('c');
    if (orderBy.length > 0) {
      queryBuilder.orderBy(`c.` + orderBy, 'DESC');
    }
    return paginate<Hotel>(queryBuilder, options);
  }
}
