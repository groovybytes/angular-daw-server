import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req} from '@nestjs/common';
import {Project} from "../../../src/app/angular-daw/model/daw/Project";

const MidiConvert = require("MidiConvert");
const fs = require("fs");

@Controller('project')
export class ProjectsController {
  @Post()
  create(@Body() project:Project) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
