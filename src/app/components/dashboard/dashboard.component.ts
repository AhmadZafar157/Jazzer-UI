import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JazzerService } from '../../jazzer.service';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  tabs: any;
  currentTab: number = 0;
  user: any = null;
  isNonCVM: boolean = false;

  constructor(private router: Router, private jazzerService: JazzerService, public dialog: MatDialog) {
    this.currentTab = 0;
  }
  openComponent(currentTab: number) {
    this.currentTab = currentTab;
    if (this.currentTab == 0) { this.router.navigate(['/home/']); }
    if (this.currentTab == 1) { this.router.navigate(['/home/segments']); }
    if (this.currentTab == 2) { this.router.navigate(['/home/campaigns']); }
    if (this.currentTab == 3) { this.router.navigate(['/home/teams']); }
  }
  ngOnInit(): void {
    this.user = this.jazzerService.decrypt(localStorage.getItem('user'));
    console.log(this.user)
    if (this.user.user_type == 'non_cvm_type') {
      this.isNonCVM = true;
    }
    this.openComponent(this.currentTab)
  }

  signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goToUserCreation() {
    const dialogRef = this.dialog.open(SignupComponent);
  }
}
