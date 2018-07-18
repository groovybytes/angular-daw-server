import {Get, Injectable, LoggerService, Param} from "@nestjs/common";
import {InstrumentsEnum} from "../../../src/app/angular-daw/model/daw/InstrumentsEnum";
import {Sample} from "../../../src/app/angular-daw/model/daw/Sample";
import {InstrumentInfo} from "../../../src/app/angular-daw/api/InstrumentInfo";

const Fuse = require("fuse.js");
const fs = require("fs");

@Injectable()
export class SamplesService {


  constructor(private log: LoggerService) {

  }

  @Get(':name')
  getInstrumentInfo(@Param('name') name: string): InstrumentInfo {
    fs.readdir("../assets", function(err, items) {
      console.log(items);

      for (var i=0; i<items.length; i++) {
        console.log(items[i]);
      }
    });
    return null;


    /* fs.readFile('/etc/passwd', (err, data) => {
       if (err) throw err;
       console.log(data);
     });*/


  }

  /*loadInstruments(instruments: Array<string>): Promise<InstrumentsContext> {
    let context = new InstrumentsContext();
    return new Promise((resolve, reject) => {
      let promises = [];
      instruments.forEach(instrument => {
        let promise = this.getSamples(["assets/sounds/instruments/" + instrument + "/1.wav"]);
        promise.then(result => {
          result[0].baseNote = "A3";
          context[instrument] = result[0];
        });
        promises.push(promise);

      })
      Promise.all(promises).then(() => resolve(context));
    })

  }*/

  /*  async getSamplesForInstrument(instrument: InstrumentsEnum): Promise<Array<Sample>> {
      this.log.log("retrieving samples for " + instrument);
      return new Promise((resolve, reject) => {
        let results = this.getInsruments();
            var options = {
              keys: [{name: 'id'}],
              threshold: 0.2
            };
            var fuse = new Fuse(results.map(d => ({id: d})), options)
            let foundInstrumentName = fuse.search(instrument.toString())[0].id;
            this.log.log("info", "using instrument " + foundInstrumentName);

            this.http.get(this.config.getUrl("sounds/instruments/" + foundInstrumentName)).subscribe((results: Array<string>) => {
              this.log.startGroup("found " + results.length + " samples",true);
              this.getSamples(results.map(result => "assets/sounds/instruments/" + foundInstrumentName + "/" + result))
                .then(results => {
                  results.forEach(result => {
                    this.log.log("info", "loading sample " + result.id);
                    try {
                      let parts = result.id.split("/");
                      let sampleName = parts[parts.length - 1].split(".")[0].toLowerCase();
                      sampleName = sampleName.replace("l-ra", "");
                      sampleName = sampleName.replace("l-r", "");
                      sampleName = sampleName.toUpperCase();
                      parts = sampleName.split(" ");
                      let noteName = parts[parts.length - 1].replace("#", "i");
                      result.baseNote = NoteInfo.get(noteName);
                      if (result.baseNote === undefined) throw new Error("couldnt find a basenote from sample name " + sampleName);
                      this.log.log("info", "success..");
                    } catch (e) {
                        this.reject(reject,e);






                     } finally {

                    }
                  })
                  this.log.endGroup();
                  resolve(results);
                })
                .catch(error => {
                  this.log.endGroup();
                  this.reject(reject, error)
                });

            }, (error) => this.reject(reject, error))
          },
          (error) => this.reject(reject, error))
      })*/


}
