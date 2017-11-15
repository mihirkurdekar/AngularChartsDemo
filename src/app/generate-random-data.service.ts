import { Injectable } from '@angular/core';
import { ChartData } from './chart-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'util';
import { ServiceRequest } from './service-request';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GenerateRandomDataService {

  constructor(private http: HttpClient) { }
  min = 0;
  max = 1000;
  response: Array<ChartData>;

  /* generateRandomNumber(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  generateData(startDate: Date, endDate: Date): Array<ChartData> {
    this.response = [];
    while (startDate <= endDate) {
      const temp: ChartData = new ChartData(new Date(startDate), this.generateRandomNumber());
      startDate.setSeconds(startDate.getSeconds() + 1);
      this.response.push(temp);
    }

    return this.response;
  } */

  getDataFromService(startDate: Date, endDate: Date): Observable<Array<ChartData>> {
    this.response = [];
    const req: ServiceRequest = {
      startDate: startDate,
      endDate: endDate
    };
    return this.http.post<Array<ChartData>>(
      'http://localhost:3000/randomdata', req, {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      });
  }


}
