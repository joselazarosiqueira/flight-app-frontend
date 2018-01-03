import { Flight } from './../models/flight';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app-setting';
import { environment } from '../../environments/environment';

@Injectable()
export class FlightService {

  private static METHOD_SERVICE_FINDALL = '/flights';

  constructor(private http: Http) { }

  public getFlights() {
    const endpoint = environment.server.localhost +
    FlightService.METHOD_SERVICE_FINDALL;
    return this.http.get(endpoint)
       .map((response) => {
         return response.json() as Flight [];
       });
  }

  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Server error');
  }
}
