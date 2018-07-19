import { Body, Controller, Delete, Get, Inject, Logger, LoggerService, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ConfigService } from '../services/config.service';
import Fuse = require('fuse.js');
import { InstrumentInfo } from '../../../audiotools/src/app/angular-daw/api/InstrumentInfo';
import { FuseOptions } from 'fuse.js';
import * as winston from 'winston';




const MidiConvert = require("MidiConvert");
const fs = require("fs");

@Controller('instrumentinfo')
export class InstrumentinfoController {

  constructor(private config: ConfigService,
              @Inject('Logger') private logger: winston.Logger,
              @Inject('Fuse') private Fuse: Fuse) {

  }

  private errorChecked(err, reject): boolean {
    if (err) {
      this.logger.error(err);
      reject(err);
      return false;
    }

    return true;
  }

  @Get(':id')
  async find(@Param('id') id): Promise<InstrumentInfo> {

    let path = this.config.get("ASSETS") + "sounds/instruments/";
    return new Promise<InstrumentInfo>((resolve, reject) => {
      fs.readdir(path, (err, items) => {
        if (this.errorChecked(err, reject)) {
          let options: FuseOptions = {
            keys: [{name: 'id', weight: 1}],
            threshold: 0.2
          };
          let fuse = new Fuse(items.map(d => ({id: d})), options);
          let foundInstrumentName = <string>fuse.search(id)[0]["id"];
          let info = new InstrumentInfo();
          info.id = foundInstrumentName;
          this.logger.info(path + foundInstrumentName)
          fs.readdir(path + foundInstrumentName, (err, items) => {
            if (this.errorChecked(err, reject)) {
              info.samples=items.map(item=>path.substr(1,path.length-1)+foundInstrumentName+"/"+item);
              resolve(info);
            }

          })
        }
      });
    })
  }
}
