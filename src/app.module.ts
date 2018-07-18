import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {InstrumentinfoController} from "./controllers/instrumentinfo.controller";
import {ConfigService} from "./services/config.service";
import * as winston from "winston";
import {format} from "winston";
import {LoggingController} from "./controllers/logging.controller";
const Fuse = require("fuse.js");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp}  ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});
@Module({
  imports: [],
  controllers: [AppController,InstrumentinfoController,LoggingController],
  providers: [
    AppService,
    {
      provide: ConfigService,
      useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
    },
    {
      provide: "Logger",
      useValue: logger,
    },
    {
      provide: "Fuse",
      useValue: Fuse,
    }

  ],
  exports: [ConfigService]
})
export class AppModule {}

