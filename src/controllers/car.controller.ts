import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CarService } from '../services/car.service';

@Controller('car')
export class CarController {
  constructor(private CarService: CarService) {}
  @Get('/:id')
  isAvailableCar(@Param('id') id: string) {
    return this.CarService.checkCarAvailable(id);
  }

  @Get('/check')
  checkCarPrice(@Query() query) {
    const { startDate, endDate } = query;
    return `Свободна с ${startDate} по  ${endDate}`;
  }

  @Post()
  createBookingSession(@Body() body) {
    return body;
  }

  @Get('/report/:month')
  getReport(@Param('month') month: number) {
    return `Отчет за ${month}`;
  }

  @Post('/new')
  createNewCar(@Body() body) {
    return this.CarService.registerNewCar(body.number);
  }

  @Get()
  getAllCars() {
    return this.CarService.getAll();
  }
}
