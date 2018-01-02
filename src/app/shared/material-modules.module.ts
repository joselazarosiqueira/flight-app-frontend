import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatOptionModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule, MatSortModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatButtonModule, MatSelectModule,
    MatOptionModule, MatDialogModule, MatProgressSpinnerModule,
    MatAutocompleteModule, MatTabsModule, MatCheckboxModule
  ],
  exports: [
    MatTableModule, MatSortModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatButtonModule, MatSelectModule,
    MatOptionModule, MatDialogModule, MatProgressSpinnerModule,
    MatAutocompleteModule, MatTabsModule, MatCheckboxModule
  ],
})
export class MaterialModules { }
