import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post, Request,
  HttpCode
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { Helpers } from '../helpers/helpers';

@Controller('/')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  // get list hotel by search name
  @HttpCode(200)
  @Post('/hotel/autocomplete')
  public async autocompleteHotel(@Request() req: any) {
    try {
      return this.bookingService
        .getAutocompleteHotel(req)
        .then((autocompletes) => {
          return Helpers.sendJson(
            200,
            [],
            'get autocomplete',
            'getAutocomplete',
            autocompletes,
          );
        })
        .catch((error) => {
          throw new HttpException(error.toString(), 500);
        });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }


  @HttpCode(200)
  @Post('/hotel/search')
  public async searchHotel(@Request() req: any) {
    try {
      return this.bookingService
        .searchHotel(req)
        .then((hotels) => {
          return Helpers.sendJson(
            200,
            [],
            'get hotels',
            'getHotels',
            hotels,
          );
        })
        .catch((error) => {
          throw new HttpException(error.toString(), 500);
        });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }


  @HttpCode(200)
  @Post('/hotel/get')
  public async getHotel(@Request() req: any) {
    try {
      return this.bookingService
        .getHotel(req)
        .then((hotel) => {

        return Helpers.sendJson(
            200,
            [],
            'get hotel',
            'getHotel',
            hotel,
          );
        })
        .catch((error) => {
          throw new HttpException(error.toString(), 500);
        });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }

  @HttpCode(201)
  @Post('/hotel/book')
  public async bookingHotel(@Request() req: any) {
    try {
      return this.bookingService
        .bookingHotel(req)
        .then((booking) => {

          return Helpers.sendJson(
            200,
            [],
            'Create Booking',
            'CreateBooking',
            booking,
          );
        })
        .catch((error) => {
          throw new HttpException(error.toString(), 500);
        });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }


  @HttpCode(200)
  @Post('/hotel/cancel')
  public async cancelBookHotel(@Request() req: any) {
    try {
      return this.bookingService
        .cancelBookHotel(req)
        .then((book) => {

          return Helpers.sendJson(
            200,
            [],
            'get hotel',
            'getHotel',
            book,
          );
        })
        .catch((error) => {
          throw new HttpException(error.toString(), 500);
        });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }
}
