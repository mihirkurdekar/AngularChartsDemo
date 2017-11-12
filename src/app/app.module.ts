import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { Ng2DatetimePickerModule } from "ng2-datetime-picker";


import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';

import { GenerateRandomDataService } from "./generate-random-data.service";
import { LineGraphComponent } from './line-graph/line-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    LineGraphComponent
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
