import { MaterializeModule } from 'ng2-materialize';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared.module';
import { MaterialModules } from './../../shared/material-modules.module';
import { GridComponent } from './grid.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    MaterialModules,
    MaterializeModule,
    SharedModule.forRoot(),
    RouterModule
  ],
  exports: [
    GridComponent
  ],
  providers: [
  ],
})
export class GridModule { }
