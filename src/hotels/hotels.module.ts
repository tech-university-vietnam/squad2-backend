import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [HotelsResolver, HotelsService],
})
export class HotelsModule {}
