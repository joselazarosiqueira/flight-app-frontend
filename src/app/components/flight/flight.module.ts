import { ExceptionService } from './../../services/exception.service';
import { GridModule } from './../grid/grid.module';
import { MaterializeModule } from 'ng2-materialize';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared.module';
import { MaterialModules } from './../../shared/material-modules.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlightService } from './../../services/flight.service';
import { FlightComponent } from './flight.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: FlightComponent }
];

export const RoutingLogin = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    FlightComponent
  ],
  imports: [
    RoutingLogin,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    MaterialModules,
    SharedModule,
    GridModule
  ],
  providers: [
    FlightService,
    ExceptionService
  ],
})
export class FlightModule { }
