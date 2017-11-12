import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ChartData } from '../chart-data';
import { element } from 'protractor';
import { GenerateRandomDataService } from '../generate-random-data.service';
import { GraphPoint } from '../graph-point';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {

  @Input('chart-data')
  chartData: Array<ChartData>;
  labels: Array<string>;
  dataNums: Array<number>;
  data:any;
  startDate: Date;
  endDate: Date;
  graphData: Array<GraphPoint>;

  type = 'line';
  
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private generateRandomDataService: GenerateRandomDataService) { }

  ngOnInit() {
    this.labels=[];
    this.dataNums=[];
    this.graphData = [];
    if (this.chartData !== null && this.chartData !== undefined) {
      this.chartData.forEach(element => {
        this.labels.push(element.date.toISOString());
         this.dataNums.push(element.data);
        this.graphData.push(new GraphPoint(element.date.toISOString(), element.data));
      });
    }

    this.data = {
      labels: this.labels,//["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: 'Values',
          data: this.dataNums//[65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

  }

  endDateChanged(): void {
    this.chartData = this.generateRandomDataService.generateData(this.startDate, this.endDate);
    this.ngOnInit();
  }


}
