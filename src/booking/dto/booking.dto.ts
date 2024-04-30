import { IS_ARRAY, IsNumber, IsString } from "class-validator";

export class BookingDto {

  @IsNumber()
  booking_id: Number;

  @IsNumber()
  product_id: Number;

  @IsString()
  status: String;

  @IsString()
  total_price: String;

  @IsString()
  currency: String;

  @IsString()
  payment_status: String;

  @IsString()
  payment_gateway: String;

  @IsString()
  supplier_id: String;

  @IsString()
  date: String;

  @IsString()
  user_id: String;

  @IsString()
  checkin: String;

  @IsString()
  checkout: String;

  @IsString()
  nights: String;

  @IsString()
  adults: String;

  @IsString()
  children: String;

  @IsString()
  infants: String;

  @IsString()
  tax: String;

  @IsString()
  tax_type: String;

  @IsString()
  guest_info: String;

  @IsString()
  product_name: String;

  @IsString()
  product_location: String;

  @IsString()
  product_img: String;

  @IsString()
  product_lat: String;

  @IsString()
  product_long: String;

  @IsString()
  product_stars: String;

  @IsString()
  supplier_name: String;

  @IsString()
  product_phone: String;

  @IsString()
  product_email: String;

  @IsString()
  product_website: String;

  @IsString()
  invoice_url: String;

  @IsString()
  from: String;

  @IsString()
  actual_currency: String;

  @IsString()
  actual_price: String;

  @IsString()
  booking_code: String;

  @IsString()
  user_info: String;

  @IsString()
  product_info: String;
}
