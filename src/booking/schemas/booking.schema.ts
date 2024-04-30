import * as mongoose from "mongoose";

export const BookingSchema = new mongoose.Schema(
  {
    booking_id: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    product_id: {
      type: String
    },

    status: { type: String }, // pending , confirm , paid
    total_price: { type: String }, // number total price
    currency: { type: String },
    payment_status: { type: String }, // paid , unpaid
    payment_gateway: { type: String }, // wallet, getaway
    supplier_id: { type: String },
    date: { type: String }, // timestamp
    user_id: { type: String },
    checkin: { type: String }, // timestamp
    checkout: { type: String }, // timestamp
    nights: { type: String },
    adults: { type: String },
    children: { type: String },
    infants: { type: String },
    tax: { type: String },
    tax_type: { type: String },
    guest_info: { type: String },
    product_name: { type: String },
    product_location: { type: String },
    product_img: { type: String },
    product_lat: { type: String },
    product_long: { type: String },
    product_stars: { type: String },
    supplier_name: { type: String },
    product_phone: { type: String },
    product_email: { type: String },
    product_website: { type: String },
    invoice_url: { type: String },
    from: { type: String },
    actual_currency: { type: String },
    actual_price: { type: String },
    booking_code: { type: String },
    user_info: { type: String },
    product_info: { type: String }


  },
  { timestamps: true }
);
