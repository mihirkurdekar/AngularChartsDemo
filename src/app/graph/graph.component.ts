import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ChartData } from '../chart-data';
import { element } from 'protractor';
import { GenerateRandomDataService } from '../generate-random-data.service';
import { GraphPoint } from '../graph-point';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {


  startDate: Date;
  endDate: Date;
  graphData: Array<GraphPoint>;


  constructor(private generateRandomDataService: GenerateRandomDataService) { }

  ngOnInit() {
  }

  endDateChanged(): void {
    this.generateRandomDataService.getDataFromService(this.startDate, this.endDate)
    .subscribe(
      res => {
        const chartData: Array<ChartData> = res;
        this.graphData = [];
        chartData.forEach((element) => {
          this.graphData.push(new GraphPoint(element._date.toString() , element._data));
        });
        console.log(res);
      },
      err => {
        console.log(err);
      });
    // this.chartData = this.generateRandomDataService.generateData(this.startDate, this.endDate);
    this.ngOnInit();
  }


}
