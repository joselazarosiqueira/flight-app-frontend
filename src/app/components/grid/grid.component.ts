import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
import { NewDataSource } from './datasources';
import { DatePipe } from '@angular/common';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { MatDialog, MatSort } from '@angular/material';
import { SpinnerService } from './../../services/spinner.service';
import { ExceptionService } from './../exception/exception.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { UUID } from "angular2-uuid";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public msgs: any[] = [];
  public sortedData: any;
  public filteredData: any;
  public backupData: any;
  public objRemove: any;
  public displayedColumns: any[];
  public loadedData: any[];

  @Input('defColumns')
  public defColumns;
  @Input('dataSource')
  public dataSource: any;

  @Input('routerNew')
  public routerNew: string;
  @Input('routerOpen')
  public routerOpen: string;
  @Input('filterLabel')
  public filterLabel;
  @Input('removable')
  public removable: boolean;
  @Input('editable')
  public editable: boolean;
  @Input('exportable')
  public exportable: boolean;
  @Input('filtered')
  public filtered = true;
  @Input('iconCreate')
  public iconCreate = 'btn-floating btn-large right';

  @Output('onRemove')
  public onRemove = new EventEmitter<any>();
  @Output('onOpen')
  public onOpen = new EventEmitter<any>();
  @Output('onCreate')
  public onCreate = new EventEmitter();

  @ViewChild(MatSort)
  public sort: MatSort;
  @ViewChild('filter')
  public filter: ElementRef;

  @Input('hideAddButton')
  public hideAddButton = false;

  @Input('selectable')
  public selectable: boolean = false;
  rowsList: any[] = [];
  @Output('selectedRows')
  public selectedRows = new EventEmitter();
  public checkedRow: boolean = false;
  @ViewChild('selectRowsHeader')
  public selectRowsHeader: any;
  @Input('editableColumns')
  public editableColumns: any[] = [];

  constructor(
    public router: Router,
    public translateService: TranslateService
    // private exceptionService: ExceptionService
  ) { }

  public ngOnInit() {
    this.displayedColumns = [];
    this.defColumns.forEach((def) => {
      this.displayedColumns.push(def.value);
    });

    this.dataSource.connect().subscribe(
      (value) => this.loadedData = value
      // (error: any) => this.exceptionService.handlerApiError(error)
    );

    if (this.filtered === true) {
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.filterData(this.filter.nativeElement.value);
        });
    }

    if (this.removable === undefined) {
      this.removable = true;
    }

    if (this.editable === undefined) {
      this.editable = true;
    }

    if (this.exportable === undefined) {
      this.exportable = true;
    }

    if(this.selectable){
      this.displayedColumns.unshift('selectRows');
    }

  }

  sortData(sortDataEvent) {
    this.sortedData = this.loadedData;

    const data = this.sortedData.slice();
    if (!sortDataEvent.active || sortDataEvent.direction === '') { return data; }

    const sorting = data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      [propertyA, propertyB] = [a[sortDataEvent.active], b[sortDataEvent.active]];

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (valueA < valueB ? -1 : 1) * (sortDataEvent.direction === 'asc' ? 1 : -1);
    });
    this.dataSource = new NewDataSource(sorting, this.sort);
    return sorting;
  }

  filterData(filter) {
    this.filteredData = this.loadedData;

    // Check if the filter string has spaces. If so,
    // save the the filtered data so the new filter is applied on it.
    let cleanedFilter = [];
    if (/\s/g.test(filter)) {
      cleanedFilter = filter.split(' ').filter((value) => value !== '');
      filter = cleanedFilter[cleanedFilter.length - 1];
    }
    if (cleanedFilter.length > 1) {
      this.filteredData = this.backupData;
    }

    const filtering = this.filteredData.slice().filter((item: any) => {
      let searchStr = '';
      this.displayedColumns.forEach((column) => {
        if (column !== 'id') {
          searchStr = (searchStr + item[column]).toLowerCase();
        }
      });
      return searchStr.indexOf(filter.toLowerCase()) !== -1;
    });

    this.backupData = filtering;
    this.dataSource = new NewDataSource(filtering, this.sort);
  }

  public add(item, reference?) {
    item.reference = reference;
    if (item) {
      this.loadedData.push(item);
      this.dataSource = new NewDataSource(this.loadedData, this.sort);
    }
  }

  public editItem(item, reference?) {
    item.reference = reference;
    if (item) {
      let i = 0;
      for (const data of this.loadedData) {
        if (item.id && item.id === data.id) {
          this.loadedData[i] = item;
          break;
        } else if (item.uuid && item.uuid === data.uuid) {
          this.loadedData[i] = item;
          break;
        }
        i++;
      }
      this.dataSource = new NewDataSource(this.loadedData, this.sort);
    }
  }

  public open(event) {
    this.onOpen.emit(event);
  }

  public create() {
    this.onCreate.emit();
  }

  public removeWithoutMessageConfirmation(obj: any) {
    this.objRemove = obj;
    this.reloadAfterRemoving();
    this.onRemove.emit(obj);
  }

  public reloadAfterRemoving() {
    if (this.objRemove.id) {
      this.loadedData = this.loadedData.filter(
        (filter) => filter.id !== this.objRemove.id
      );
    } else if (this.objRemove.uuid) {
      const index = this.loadedData.findIndex(i => i.uuid === this.objRemove.uuid);
      if (index > -1) {
        this.loadedData.splice(index, 1);
      }

    }
    this.dataSource = new NewDataSource(this.loadedData, this.sort);
  }

  public getHeaderColumn(column) {
    let display = '';
    for (const def of this.defColumns) {
      if (def.value === column) {
        display = def.display;
      }
    }
    return display;
  }


  addOrRemoveToRowsList(event, row) {
    this.selectRowsHeader.checked = false;

    if(event.checked){
      const index = this.rowsList
      .findIndex(item => item.id === row.id);
      if(index === -1){
        this.rowsList.push(row);
      }

    } else {
      const index = this.rowsList
      .findIndex(item => item.id === row.id);
      this.rowsList.splice(index, 1);
    }


    this.addIdsToRowList(this.rowsList);
    this.selectedRows.emit(this.rowsList);
  }

  markUnmarkAll(event) {
    if(event.checked) {
      this.checkedRow = true;
      this.rowsList = this.loadedData.slice();
      this.addIdsToRowList(this.rowsList);
    } else {
      this.checkedRow = false;
      this.rowsList = [];
    }

    this.selectedRows.emit(this.rowsList);
  }

  addIdsToRowList(rowList) {
    rowList.forEach(r => {
      if(!r.id){
        r.id = UUID.UUID();
      }
    });

    return rowList;
  }


  editRowItem(row, column, value) {

    // Updating the loadedData, even if no selectable row
    // is marked to be 'emitted'.
    const indexLoaded = this.loadedData.findIndex(item => item.id === row.id);
    if(indexLoaded !== -1) {
      this.loadedData[indexLoaded][column] = value;
    }

    // Updating the information loade in the rowList array,
    //  id the 'id' is found.
    const index = this.rowsList.findIndex(item => item.id === row.id);
    if(index !== -1) {
      this.rowsList[index][column] = value;
    }

    this.selectedRows.emit(this.rowsList);
  }



}
