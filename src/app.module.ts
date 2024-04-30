import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {ConfigModule} from '@nestjs/config';

import {
    Module,
    NestModule,
    MiddlewareConsumer,
} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BookingModule } from "./booking/booking.module";

const dbName = "hotelmerging";
const MONGODB_URI = "mongodb://127.0.0.1:27017" + "/" + dbName;

@Module({
    controllers: [AppController],
    imports: [
        MulterModule.register({
            dest: './public',
        }),

        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public')
        }),

        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            expandVariables: true,
        }),

        MongooseModule.forRoot(MONGODB_URI),
        BookingModule
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

    }
}

