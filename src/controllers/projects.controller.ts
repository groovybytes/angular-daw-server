import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ConfigService } from '../services/config.service';
import { FuseOptions } from 'fuse.js';
import * as winston from 'winston';
import { InstrumentInfo } from '../../../audiotools/src/app/api/InstrumentInfo';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entitites/project.entity';
import Fuse = require('fuse.js');


const MidiConvert = require('MidiConvert');
const fs = require('fs');

@Controller('projects')
export class InstrumentinfoController {

  constructor(private config: ConfigService,
              @InjectRepository(ProjectEntity)
              private readonly projectRepository: Repository<ProjectEntity>,
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
  async find(@Param('id') id): Promise<Array<ProjectEntity>> {
     return this.projectRepository.findByIds([id]);
  }
}
