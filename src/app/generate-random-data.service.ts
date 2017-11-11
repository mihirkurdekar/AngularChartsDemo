import { Injectable } from '@angular/core';
import {ChartData} from "./chart-data";

@Injectable()
export class GenerateRandomDataService {

  constructor() { }
  min: number=0;
  max: number=1000;
  response: Array<ChartData>;

  generateRandomNumber(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  generateData(startDate:Date,endDate:Date):Array<ChartData>{
    this.response=[];
    while(startDate<=endDate){
      let temp:ChartData = new ChartData(new Date(startDate),this.generateRandomNumber());
      startDate.setSeconds(startDate.getSeconds()+1);
      this.response.push(temp);
    }
    
    return this.response;
  }


}
