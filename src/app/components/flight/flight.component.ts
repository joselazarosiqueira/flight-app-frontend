import { ExceptionService } from './../../services/exception.service';
import { NewDataSource } from './../grid/datasources';
import { DatePipe } from '@angular/common';
import { environment } from './../../../environments/environment';
import { Flight } from './../../models/flight';
import { Http } from '@angular/http';

import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChildren, ViewContainerRef } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { FlightService } from './../../services/flight.service';

export class FlightVO {
  flightNumber: string;
  from: string;
  to: string;
  status: string;
  departureDateTime: any;
  arrivalDateTime: any;
  id: any;
}

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
  providers:
  [
    SpinnerService, FlightService, DatePipe
  ]
})
export class FlightComponent implements OnInit {

  defColumnsGrid = [
    { value: 'flightNumber', display: 'Número' },
    { value: 'from', display: 'Origem' },
    { value: 'to', display: 'Destino' },
    { value: 'departureDateTime', display: 'Data/Hora de Partida' },
    { value: 'arrivalDateTime', display: 'Data/Hora de Chegada' },
    { value: 'status', display: 'Status' }
  ];

  public dataSource: any;

  constructor(
    private vcr: ViewContainerRef,
    private router: Router,
    public route: ActivatedRoute,
    public translateService: TranslateService,
    private toastr: ToastsManager,
    private spinnerService: SpinnerService,
    private flightService: FlightService,
    private datePipe: DatePipe,
    private exceptionService: ExceptionService
  ) {
    this.spinnerService.setRootViewContainerRef(this.vcr);
  }

  ngOnInit() {
    this.spinnerService.activate();
    this.flightService.getFlights()
      .subscribe(
        (response: Flight[]) => {
          const data = [];
          for (const item of response){
            const flightVO = new FlightVO();
            flightVO.id = item.id;
            flightVO.arrivalDateTime = item.arrivalDateTime;
            flightVO.departureDateTime = item.departureDateTime;
            flightVO.flightNumber = item.flightNumber;
            flightVO.from = item.from.name;
            flightVO.to = item.to.name;
            flightVO.status = this.translateService.instant('FLIGHT.STATUS.' + item.status);
            data.push(flightVO);
          }

          this.dataSource = new NewDataSource(data, null);
          this.spinnerService.deactivate();
        },
        (error: any) => {
        }
      );
  }

  getStyle(): any {
    let style: any;
    if (this.router.url === '/') {
      style = { width: '70%' };
    } else {
      style = { width: '15%', display: 'table', margin: '0 auto' };
    }
    return style;
  }

}







