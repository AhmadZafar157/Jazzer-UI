import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { JazzerService } from '../../jazzer.service';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{

  tabs: any;
  currentTab: number=1;
  user:any=null;
  isNonCVM: boolean=false;
  
  constructor(private router: Router,private jazzerService: JazzerService,public dialog: MatDialog) {
    this.currentTab = 1;
  }
  openComponent(currentTab:number){
    this.currentTab=currentTab;
  }
  ngOnInit(): void {
    this.user= this.jazzerService.decrypt(localStorage.getItem('user'));
    console.log(this.user)
    if(this.user.user_type=='non_cvm_type')
    {
      this.isNonCVM=true;
    }
  }

  getSelectedTab() {
    return this.tabs[this.currentTab].component;
  }

  signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(ConnectTdComponent);
  // }

  // goToBases() {
  //     const dialogRef = this.dialog.open(BasesComponent);
  // }

  // goToCampaigns() {
  //   const dialogRef = this.dialog.open(CampaignsComponent);

  // }
  // goToTeams(){
  //   const dialogRef = this.dialog.open(TeamsComponent);
  // }
  goToUserCreation(){
    const dialogRef = this.dialog.open(SignupComponent);
  }
}
