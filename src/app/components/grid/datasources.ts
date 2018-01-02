import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';

export class NewDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(private newData: any, private _sort: MatSort) { super(); }
  connect(): Observable<any[]> {
    return Observable.of(this.newData);
  }
  disconnect() { }
}
