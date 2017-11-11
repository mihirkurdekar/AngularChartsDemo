import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import Chart from 'chart.js';
import { ChartData } from '../chart-data';
import { element } from 'protractor';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {

  @Input('chart-data')
  chartData:Array<ChartData>;
  labels: Array<string>;
  dataNums: Array<number>;
  data:any;


  constructor() { }

  ngOnInit() {
    this.labels=[];
    this.dataNums=[];
    this.chartData.forEach(element => {
      this.labels.push(element.date.getSeconds().toString());
      this.dataNums.push(element.data);
    });

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
  
  type = 'line';
  
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


}
