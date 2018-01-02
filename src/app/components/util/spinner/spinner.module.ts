import { SpinnerService } from './../../../services/spinner.service';
import { SpinnerComponent } from './spinner.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    MaterializeModule.forRoot(),
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    SpinnerService
  ],
  entryComponents: [SpinnerComponent]
})
export class SpinnerModule { }
