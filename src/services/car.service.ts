import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { Repository } from 'typeorm';
import { Car } from '../entities/car.entity';
import { getDatesDifference } from '../utils/getDatesDifference';
import { DAY_COST, MAX_BOOKING_PERIOD } from '../constants';
import { getBookingPrice } from '../utils/getBookingPrice';
import { CreateSessionDto } from '../dto/create-session.dto';
import { checkIsWeekendDay } from '../utils/checkIsWeekendDay';

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

  async checkCarAvailable(number: string): Promise<Car> {
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

  async getCarPrice(startDate: string, endDate: string): Promise<number> {
    return getBookingPrice(new Date(startDate), new Date(endDate));
  }

  async createBookingSession(body: CreateSessionDto): Promise<Session> {
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    const car = await this.carRepository.findOneBy({ number: body.carNumber });

    if (checkIsWeekendDay(startDate) || checkIsWeekendDay(endDate))
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The first and last day of booking cannot fall on weekend day',
        },
        HttpStatus.BAD_REQUEST,
      );

    if (!car) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'There is no car with this number',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (getDatesDifference(startDate, endDate) > MAX_BOOKING_PERIOD) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The maximum allowed period has been exceeded',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const session = new Session();

    session.startDate = startDate;
    session.endDate = endDate;
    session.carNumber = body.carNumber;

    await this.sessionRepository.save(session);

    return session;
  }
}
