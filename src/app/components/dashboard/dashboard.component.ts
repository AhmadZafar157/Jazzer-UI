import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ConnectTdComponent } from '../connect-td/connect-td.component';
import { BasesComponent } from '../bases/bases.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { TeamsComponent } from '../teams/teams.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  screen: any = null;

  constructor(public dialog: MatDialog, public bases: MatDialog, public campaigns: MatDialog) {
    this.screen = {
      default: true,
      bases: false,
      campaigns: false
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConnectTdComponent);
  }

  goToBases() {
      const dialogRef = this.bases.open(BasesComponent);
  }

  goToCampaigns() {
    const dialogRef = this.campaigns.open(CampaignsComponent);

  }
  goToTeams(){
    const dialogRef = this.campaigns.open(TeamsComponent);
  }
}
