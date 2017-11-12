import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { Ng2DatetimePickerModule } from "ng2-datetime-picker";


import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { GenerateRandomDataService } from "./generate-random-data.service";


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    Ng2DatetimePickerModule
  ],
  providers: [GenerateRandomDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
