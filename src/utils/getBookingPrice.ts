import { getDatesDifference } from './getDatesDifference';
import { DAY_COST, MAX_BOOKING_PERIOD } from '../constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export const getBookingPrice = (startDate, endDate) => {
  const days = getDatesDifference(startDate, endDate);
  let price = 0;

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
};
