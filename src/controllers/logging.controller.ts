import {Logger} from "winston";
import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ConfigService} from "../services/config.service";


@Controller('log')
export class LoggingController {

  constructor(private config: ConfigService,
              @Inject('Logger') private logger: Logger) {

  }

  @Post()
  create(@Body() msg:any, severity:string):void {
    this.logger.log(severity?severity.toLowerCase():"info",JSON.stringify(msg));
  }

}
