import { Airplane } from './airplane';
import { Pilot } from './pilot';
import { City } from './city';
export class Flight {
  id: number;
  flightNumber: string;
  to: City;
  from: City;
  departureDateTime: any;
  arrivalDateTime: any;
  status: string;
  pilot: Pilot;
  airplane: Airplane;
}
