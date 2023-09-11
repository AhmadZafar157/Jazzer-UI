import { Component } from '@angular/core';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {ShowBaseComponent} from '../show-base/show-base.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'BaseDialog',
  templateUrl: './baseDialog.component.html',
  styleUrls: ['./baseDialog.component.scss']
})
export class BaseDialog {
  constructor(private jazzerService: JazzerService,private router: Router, public dialog: MatDialog, public dialogRef: MatDialogRef<BaseDialog>) {}

  openCreateBaseForm() {
    this.dialogRef.close();
    this.jazzerService.openBaseForm("default");

    this.dialog.open(BaseFormComponent);
  }

  openImportBaseForm() {
    this.dialogRef.close();
    this.jazzerService.openBaseForm("reduced");

    this.dialog.open(BaseFormComponent);
  }
}

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.scss']
})
export class BasesComponent implements AfterViewInit  {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  bases: any;
  displayedColumns: string[] = ['BaseName', 'Count', 'Cap', 'ExecutionPotential', 'CreationTime', 'Action'];
  dataSource = new MatTableDataSource([]);

  constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,private router: Router, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {
    // this.sort = new MatSort();
  }

  ngOnInit(): void {

    this.jazzerService.baseChange.subscribe(arg => {
      this.jazzerService.getAllBases().subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.bases = res.data
            this.createBaseTable(this.bases);
          }
        },
        (err) => {
          this._snackBar.open(err.message, "OK", {
            duration: 3000
          });
        }
      );
    })

    // Initialization logic goes here
    this.jazzerService.getAllBases().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.bases = res.data
          this.createBaseTable(this.bases);
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  createBaseTable(bases: any) {
    const tableData = bases.map((base: any) => {
      return {
        "BaseName": base.base_name,
        "Count": base.count,
        'Cap': base.capping, 
        'ExecutionPotential': base.executedOn,
        "CreationTime": base.createdAt
      }
    });
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openBase(item:any)
  {
    const dialogRef = this.dialog.open(ShowBaseComponent, {data:{base:item}});
  }
  createNewBase() {
    this.dialog.open(BaseDialog);
    // this.router.navigate(['/create-base']);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
