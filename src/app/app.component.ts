import { SpinnerService } from './services/spinner.service';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public ngOnInit(): void {
  }

  constructor(
    private vcr: ViewContainerRef,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastsManager,
    private spinnerService: SpinnerService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.spinnerService.setRootViewContainerRef(this.vcr);
    // ----  TranslateService Configuration----------
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt-br');
    // ----------------------------------------------
  }

  public isSpinnerRunning() {
    return this.spinnerService.isStarted();
  }

  private toggleSpinner(active) {
    }

}
