import { Component } from '@angular/core';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {ShowBaseComponent} from '../show-base/show-base.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.scss']
})
export class BasesComponent {

  bases: any;

  constructor(public dialog: MatDialog,private router: Router, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Initialization logic goes here
    this.jazzerService.getAllBases().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.bases = res.data
          // console.log(this.bases);
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
}
