import { Module } from '@nestjs/common';
import { CarService } from '../services/car.service';
import { CarController } from '../controllers/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../entities/car.entity';
import { Session } from '../entities/session.entity';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [TypeOrmModule.forFeature([Car, Session])],
  exports: [TypeOrmModule],
})
export class CarModule {}
