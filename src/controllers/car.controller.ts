import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CarService } from '../services/car.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSessionDto } from '../dto/create-session.dto';

@ApiBearerAuth()
@ApiTags('Main service operations')
@Controller('car')
export class CarController {
  constructor(private CarService: CarService) {}

  @ApiOperation({
    summary: 'Checking the availability of the car',
    description:
      'The method returns a Boolean value depending on whether the car is available or not',
  })
  @ApiResponse({
    status: 200,
    description: 'Car is available/ not available',
    type: Boolean,
  })
  @ApiNotFoundResponse({
    description: 'A car with the specified ID was not found.',
  })
  @Get('check/:id')
  isAvailableCar(@Param('id') id: string) {
    return this.CarService.checkCarAvailable(id);
  }

  @ApiOperation({
    summary: 'Calculation of the rental cost',
    description:
      'The method returns the rental price for the specified period of two dates',
  })
  @ApiResponse({
    status: 200,
    description: 'The request successfully returned the rental amount',
    type: Number,
  })
  @Get('/check')
  checkCarPrice(@Query() query) {
    const { startDate, endDate } = query;

    return this.CarService.getCarPrice(startDate, endDate);
  }

  @ApiOperation({
    summary: 'Request to create a reservation',
    description: 'The method creates a car booking session',
  })
  @ApiResponse({
    status: 200,
    description: 'The method creates a car booking session',
    type: Boolean,
  })
  @Post()
  createBookingSession(@Body() body: CreateSessionDto) {
    console.log(body);
    return this.CarService.createBookingSession(body);
  }

  @ApiOperation({
    summary: 'Request to create a reservation',
    description: 'Request to create a reservation',
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Get('/report/:month')
  getReport(@Param('month') month: number) {
    return `Отчет за ${month}`;
  }

  @Post('/new')
  createNewCar(@Body() body) {
    return this.CarService.registerNewCar(body.number);
  }

  @ApiOperation({
    summary: 'Get all cars',
    description: 'Returns a list of all machines',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all machines',
    type: [String],
  })
  @Get()
  getAllCars() {
    return this.CarService.getAll();
  }
}
