import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: 'app/components/flight/flight.module#FlightModule',
    pathMatch: 'full'
  }
];


