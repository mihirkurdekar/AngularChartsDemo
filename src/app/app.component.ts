import { Component } from '@angular/core';
import { GenerateRandomDataService } from "./generate-random-data.service";
import { ChartData } from './chart-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  chartData: Array<ChartData>;
  
  constructor(private generateRandomDataService:GenerateRandomDataService) {
    let start:Date=new Date();
    let end:Date= new Date(start);
    end.setSeconds(start.getSeconds()+20);
    this.chartData=generateRandomDataService.generateData(start,end)
    console.log(this.chartData);
  }

}
