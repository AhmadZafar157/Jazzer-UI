import { Component } from '@angular/core';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {ShowBaseComponent} from '../show-base/show-base.component'
import { MatDialog } from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.scss']
})
export class BasesComponent implements AfterViewInit  {

  @ViewChild(MatSort) sort!: MatSort;
  bases: any;
  displayedColumns: string[] = ['BaseName', 'Count', 'CreationTime', 'Action'];
  dataSource = new MatTableDataSource([]);

  constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,private router: Router, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {
    // this.sort = new MatSort();
  }

  ngOnInit(): void {
    // Initialization logic goes here
    this.jazzerService.getAllBases().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.bases = res.data
          const tableData = this.bases.map((base: any) => {
            return {
              "BaseName": base.base_name,
              "Count": base.count,
              "CreationTime": base.createdAt
            }
          });
          this.dataSource = new MatTableDataSource(tableData);
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }
  openBase(item:any)
  {
    const dialogRef = this.dialog.open(ShowBaseComponent, {data:{base:item}});
  }
  createNewBase() {
    this.router.navigate(['/create-base']);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
