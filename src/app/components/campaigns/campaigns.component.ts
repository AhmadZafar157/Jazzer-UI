import { ChangeDetectorRef, Component } from '@angular/core';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShowCampaignComponent } from '../show-campaign/show-campaign.component';
import { MatPaginator } from '@angular/material/paginator';
import { CompaignFormComponent } from '../compaign-form/compaign-form.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements AfterViewInit {

  campaigns: any;
  user: any
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['Title', 'Stakeholder', 'Status', 'CreationTime', 'Action'];
  dataSource = new MatTableDataSource([]);
  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private cdr: ChangeDetectorRef, private jazzerService: JazzerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.jazzerService.campaignChange.subscribe(data => {
      this.jazzerService.getAllCampaigns().subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.campaigns = res.data;
            console.log(this.campaigns);
            this.createTableData(this.campaigns);
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
    this.jazzerService.getAllCampaigns().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.campaigns = res.data;
          console.log(this.campaigns);
          this.createTableData(this.campaigns);
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );

    this.jazzerService.getCurrentUser().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.user = res.data;
          console.log(this.user);
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  createTableData(campaigns: any) {
    console.log(campaigns);
    const tableData = campaigns.map((base: any) => {
      return {
        "Title": base.title,
        "Stakeholder": base.team_id.shortCode,
        "Status": base.status,
        "CreationTime": base.createdAt,
        "campaignInfo": base
      }
    });
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showCampaign(item: any) {
    const dialogRef = this.dialog.open(ShowCampaignComponent, { data: { campaign: item } });
  }
  createNewCampaign() {
    this.dialog.open(CompaignFormComponent);
  }

  updateCampaign(data: any) {
    const index = this.campaigns.findIndex((campaign: any) => campaign._id === data._id);
    this.campaigns[index] = data;
    this.createTableData(this.campaigns);
  }

  execute(campaign: any) {

    console.log(campaign);
    this.jazzerService.execute(campaign.campaignInfo).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          const { data } = res;
          this.updateCampaign(data)
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  parkRequest(campaign: any) {
    this.jazzerService.parkRequest(campaign.campaignInfo).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          const { data } = res;
          this.updateCampaign(data)
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
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
