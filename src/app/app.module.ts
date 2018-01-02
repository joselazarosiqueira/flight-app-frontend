import { SpinnerModule } from './components/util/spinner/spinner.module';
import { MaterializeModule } from 'ng2-materialize';
import { MaterialModules } from './shared/material-modules.module';
import { SpinnerComponent } from './components/util/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Injector } from '@angular/core';
import { ROUTES } from './app.routing.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http, JsonpModule, Jsonp } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [SpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    ToastModule,
    SpinnerModule,
    MaterialModules,
    MaterializeModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(ROUTES, { useHash: true /* , preloadingStrategy: PreloadAllModules*/ }),
  ],
  providers: [
    ToastsManager,
    ToastOptions,
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

    static injector: Injector;
    constructor(injector: Injector) {
        AppModule.injector = injector;
    }

 }
