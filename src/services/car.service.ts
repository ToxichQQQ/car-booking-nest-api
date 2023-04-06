import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { Repository } from 'typeorm';
import { Car } from '../entities/car.entity';
import { getDatesDifference } from '../utils/getDatesDifference';
import { DAY_COST, MAX_BOOKING_PERIOD } from '../controllers/constants';

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
    console.log('here');
    const car = await this.carRepository.findOneBy({ number });

    if (!car) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Car not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return car;
  }

  async getCarPrice(startDate: string, endDate: string): Promise<any> {
    const days = getDatesDifference(startDate, endDate);
    let price = 0;

    console.log(days);

    if (days > MAX_BOOKING_PERIOD)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The maximum allowed period has been exceeded',
        },
        HttpStatus.BAD_REQUEST,
      );

    for (let i = 1; i <= days; i++) {
      if (i < 5) price = price + DAY_COST;

      if (i < 10 && i >= 5) price = price + DAY_COST * 0.95;

      if (i < 18 && i >= 10) price = price + DAY_COST * 0.9;

      if (i < 30 && i >= 18) price = price + DAY_COST * 0.85;
    }

    return price;
  }
}
