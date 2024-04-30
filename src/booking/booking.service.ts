import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IBooking } from "./interfaces/booking.interface";
import axios from "axios";
import * as https from "https";
import { constants } from "../helpers/constants";
import { v4 as uuidv4 } from "uuid";

const bookingProjection = {
  __v: false
};

@Injectable()
export class BookingService {
  constructor(
    @InjectModel("Booking")
    private readonly bookingModel: Model<IBooking>
  ) {
  }

  // get list hotel by search city name and hotel name
  public async getAutocompleteHotel(req): Promise<any> {

    let query = req.body.query || "tehran";
    let language = req.body.language || "en";

    const endpoint = constants.Worldota_Autocomplete;
    let username = constants.Worldota_Username;
    let password = constants.Worldota_Password;

    let credentials = btoa(username + ":" + password);
    let basicAuth = "Basic " + credentials;
    return await axios(
      {
        method: "post",
        url: endpoint,
        data: {
          "query": query,
          "language": language
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        headers: { "Authorization": basicAuth }
      }).then(function(response) {
      return {
        "hotels": response.data.data.hotels
      };
    })
      .catch(function(error) {
        return error;
      })
      .finally(() => {
        return [];
      });
  }

  // show list hotel by date and count guest
  public async searchHotel(req): Promise<any> {

    let checkin = req.body.checkin || "2024-06-02";
    let checkout = req.body.checkout || "2024-06-02";
    let guests = req.body.guests;
    let language = req.body.language || "en";
    let region_id = req.body.region_id || "6053839";
    let hotels_limit = req.body.hotels_limit || "3";
    let currency = req.body.currency || "EUR";

    const endpoint = constants.Worldota_SearchHotel;
    let username = constants.Worldota_Username;
    let password = constants.Worldota_Password;

    let credentials = btoa(username + ":" + password);
    let basicAuth = "Basic " + credentials;
    return await axios(
      {
        method: "post",
        url: endpoint,
        data: {
          "checkin": checkin,
          "checkout": checkout,
          "language": language,
          "guests": guests,
          "region_id": region_id,
          "hotels_limit": hotels_limit,
          "currency": currency
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        headers: { "Authorization": basicAuth }
      }).then(function(response) {

      let hotels = [];
      response.data.data.hotels.forEach(function(item) {

        let rates = [];
        item.rates.forEach(function(rate_item, index) {

          let rate = {
            "amenities": rate_item.amenities_data,
            "room_name": rate_item.room_name,
            "amount": rate_item.payment_options.payment_types[0].amount,
            "show_amount": rate_item.payment_options.payment_types[0].show_amount,
            "currency_code": rate_item.payment_options.payment_types[0].currency_code,
            "show_currency_code": rate_item.payment_options.payment_types[0].show_currency_code

          };
          if (index < 10) {
            rates.push(rate);
          }
        });
        let hotel = {
          "id": item.id,
          "rates": rates

        };
        hotels.push(hotel);
      });
      return {
        "hotels": hotels
      };
    })
      .catch(function(error) {
        return error;
      })
      .finally(() => {
        return [];
      });
  }

  // get and show detail hotel
  public async getHotel(req): Promise<any> {

    let language = req.body.language || "en";
    let id = req.body.id || "";

    let checkin = req.body.checkin || "2024-06-02";
    let checkout = req.body.checkout || "2024-06-02";
    let guests = req.body.guests;
    let currency = req.body.currency || "EUR";

    const endpoint = constants.Worldota_GetHotel;
    const endpointPageHotel = constants.Worldota_PageHotel;
    let username = constants.Worldota_Username;
    let password = constants.Worldota_Password;

    let credentials = btoa(username + ":" + password);
    let basicAuth = "Basic " + credentials;

    const response_rate = await axios(
      {
        method: "post",
        url: endpointPageHotel,
        data: {
          "id": id,
          "checkin": checkin,
          "checkout": checkout,
          "language": language,
          "guests": guests,
          "currency": currency
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        headers: { "Authorization": basicAuth }
      }).then(function(response) {
      console.log(response.status);


      let rates = [];
      response.data.data.hotels[0].rates.forEach(function(rate_item, index) {
        let rate = {
          "book_hash": rate_item.book_hash,
          "match_hash": rate_item.match_hash,
          "room_name": rate_item.room_name,
          "amenities_data": rate_item.amenities_data,
          "amount": rate_item.payment_options.payment_types[0].amount,
          "show_amount": rate_item.payment_options.payment_types[0].show_amount,
          "currency_code": rate_item.payment_options.payment_types[0].currency_code,
          "show_currency_code": rate_item.payment_options.payment_types[0].show_currency_code

        };
        if (index < 10) {
          rates.push(rate);
        }
      });
      return rates;
    })
      .catch(function(error) {
        return error;
      })
      .finally(() => {
        return [];
      });


    return await axios(
      {
        method: "post",
        url: endpoint,
        data: {
          "id": id,
          "language": language
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        headers: { "Authorization": basicAuth }
      }).then(function(response) {
      console.log(response.status);

      let address = response.data.data.address;
      let amenity_groups = response.data.data.amenity_groups;
      let description_struct = response.data.data.description_struct;
      let email = response.data.data.email;
      let id = response.data.data.id;
      let name = response.data.data.name;
      let images = response.data.data.images;
      let latitude = response.data.data.latitude;
      let longitude = response.data.data.longitude;
      let policy = response.data.data.metapolicy_extra_info;
      let phone = response.data.data.phone;
      let postal_code = response.data.data.postal_code;
      let region_name = response.data.data.region.name;
      let room_groups = [];
      response.data.data.room_groups.forEach(function(room_item, index) {

        let room = {
          "images": room_item.images,
          "name": room_item.name,
          "room_amenities": room_item.room_amenities
        };
        if (index < 10) {
          room_groups.push(room);
        }
      });
      return {
        "id": id,
        "address": address,
        "amenity_groups": amenity_groups,
        "description_struct": description_struct,
        "email": email,
        "images": images,
        "latitude": latitude,
        "longitude": longitude,
        "policy": policy,
        "region_name": region_name,
        "name": name,
        "phone": phone,
        "postal_code": postal_code,
        "room_groups": room_groups,
        "rates": response_rate
      };
    })
      .catch(function(error) {
        return error;
      })
      .finally(() => {
        return [];
      });
  }

  // book hotel
  public async bookingHotel(req): Promise<any> {


    const httpsAgentValue = new https.Agent({
      rejectUnauthorized: false
    });

    let language = req.body.language || "en";
    const partner_order_id = uuidv4();
    let book_hash = req.body.book_hash || "";
    let user_ip = req.body.user_ip || "5.127.127.207";

    const endpoint = constants.Worldota_BookingFromHotel;
    let username = constants.Worldota_Username;
    let password = constants.Worldota_Password;

    let credentials = btoa(username + ":" + password);
    let basicAuth = "Basic " + credentials;


    const booking_form = await axios(
      {
        method: "post",
        url: endpoint,
        data: {
          "partner_order_id": partner_order_id,
          "book_hash": book_hash,
          "language": language,
          "user_ip": user_ip
        },
        httpsAgent: httpsAgentValue,
        headers: { "Authorization": basicAuth }
      }).then(function(response) {
      console.log(response.data);
      return response.data;
    })
      .catch(function(error) {
        return error;
      });

    if (booking_form.status == "ok") {
      const endpoint_booking_finish = constants.Worldota_BookingFinishHotel;

      let email = req.body.email || "";
      let phone = req.body.phone || "";
      let rooms = req.body.rooms || "";
      let payment_type = req.body.payment_type || "";

      const booking_finish = await axios(
        {
          method: "post",
          url: endpoint_booking_finish,
          data: {
            "user": {
              "email": email,
              "comment": "",
              "phone": phone
            },
            "partner": {
              "partner_order_id": partner_order_id,
              "comment": "",
              "amount_sell_b2b2c": "0"
            },
            "language": language,
            "rooms": rooms,

            "payment_type": payment_type
          },
          httpsAgent: httpsAgentValue,
          headers: { "Authorization": basicAuth }
        }).then(function(response) {
        console.log(response.data);
        return response.data;
      })
        .catch(function(error) {
          return error;
        });


      let product_info = req.body;
      let info = req.body.info;
      let checkin = req.body.checkin;
      let checkout = req.body.checkout;

      let user_info = JSON.stringify({
        "email": email,
        "phone": phone
      });

      let adults = 0;
      let children = 0;
      let infants = 0;
      req.body.guests.forEach(function(guest){
        adults += guest.adults;

        if (guest.children.length > 0){
          guest.children.forEach(function(child){
            if (child && child > 2){
              children += 1;
            }else{
              infants += 1;
            }
          });
        }

      });
      // save booking
      let InterFaceBooking = {
        booking_id: Date.now(),
        product_id: "",
        status: "confirm",
        total_price: payment_type.currency_code,
        currency: payment_type.amount,
        payment_status: "deposit",
        payment_gateway: "",
        supplier_id: "1",
        date: Date(),
        user_id: "",
        checkin: checkin,
        checkout: checkout,
        nights: "",
        adults: adults,
        children: children,
        infants: infants,
        tax: "0",
        tax_type: "percent",
        guest_info: JSON.stringify(rooms),
        product_name: info.name,
        product_location: info.region_name,
        product_img: JSON.stringify(info.images),
        product_lat: info.latitude,
        product_long: info.longitude,
        product_stars: "",
        supplier_name: "worldota",
        product_phone: info.phone,
        product_email: info.email,
        product_website: "",
        invoice_url: "",
        from: "API",
        actual_currency: payment_type.currency_code,
        actual_price: payment_type.amount,
        booking_code: partner_order_id,
        user_info: user_info,
        product_info: JSON.stringify(product_info)
      };
      const bookingHotel = await new this.bookingModel(InterFaceBooking);
           bookingHotel.save();

           return {
             "status": 200,
             "booking_code": bookingHotel.booking_code,
             "product_name": bookingHotel.product_name,
           };
    }
  }

  // cancel booking
  public async cancelBookHotel(req): Promise<any> {

    const httpsAgentValue = new https.Agent({
      rejectUnauthorized: false
    });

    let username = constants.Worldota_Username;
    let password = constants.Worldota_Password;

    let credentials = btoa(username + ":" + password);
    let basicAuth = "Basic " + credentials;

    let partner_order_id = req.body.partner_order_id;

    const endpoint_booking_cancel = constants.Worldota_BookingCancelHotel;
    return await axios(
      {
        method: "post",
        url: endpoint_booking_cancel,
        data: {
          "partner_order_id": partner_order_id
        },
        httpsAgent: httpsAgentValue,
        headers: { "Authorization": basicAuth }
      }).then(function(response) {
      console.log(response.data);
      return response.data;
    })
      .catch(function(error) {
        return error;
      });


  }

}
