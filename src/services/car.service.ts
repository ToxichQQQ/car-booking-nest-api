import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { Repository } from 'typeorm';
import { Car } from '../entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async registerNewCar(id): Promise<Car> {
    const car = new Car();
    car.number = id;

    await this.carRepository.save(car);

    return car;
  }

  getAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async checkCarAvailable(number: string): Promise<any> {
    const car = await this.carRepository.findOneBy({ number });

    if (!car) {
      throw new Error('Car is not found');
    }

    return car;
  }
}
