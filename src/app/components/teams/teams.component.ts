import { Component } from '@angular/core';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ShowTeamComponent } from '../show-team/show-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements AfterViewInit{
  
  teams: any;
  user: any
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['Team', 'ShortCode', 'Action'];
  dataSource = new MatTableDataSource([]);
  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private router: Router, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Initialization logic goes here
   this.getTeams();

    this.jazzerService.getCurrentUser().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.user = res.data;
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }
  getTeams() {
    this.jazzerService.getAllTeams().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.teams = res.data;
          const tableData = this.teams.map((base: any) => {
            return {
              "Team": base.name,
              "ShortCode": base.shortCode,
              "teamRef": base
            }
          });
          console.log(tableData)
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
  createNewTeam() {
    this.router.navigate(['/create-team']);
  }
  showTeams(item:any)
  {
    const dialogRef = this.dialog.open(ShowTeamComponent, {data:{team:item}});
  }
  deleteTeams(team:any)
  {
    this.jazzerService.deleteTeam(team.teamRef._id).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.getTeams()
          this._snackBar.open("Team Successfully deleted", "OK", {
            duration: 3000
          });
          console.log(res)
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );    

  }
  updateCampaign(data: any) {
    const index = this.teams.findIndex((campaign: any) => campaign._id === data._id);
    this.teams[index] = data;
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
