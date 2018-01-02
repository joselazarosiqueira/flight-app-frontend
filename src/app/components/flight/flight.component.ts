import { environment } from './../../../environments/environment';
import { Flight } from './../../models/flight';
import { Http } from '@angular/http';

import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChildren, ViewContainerRef } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { FlightService } from './../../services/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
  providers:
  [
    SpinnerService, FlightService
  ]
})
export class FlightComponent implements OnInit {

  constructor(
    private vcr: ViewContainerRef,
    private router: Router,
    public route: ActivatedRoute,
    public translateService: TranslateService,
    private toastr: ToastsManager,
    private spinnerService: SpinnerService,
    private flightService: FlightService,
  ) {
    this.spinnerService.setRootViewContainerRef(this.vcr);
  }

  ngOnInit() {
    this.flightService.getCompany()
      .subscribe(
        (response: Flight) => {
          // to implement
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







