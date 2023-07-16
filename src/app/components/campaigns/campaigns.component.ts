import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JazzerService } from 'src/app/jazzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent {
  
  campaigns: any;
  user: any

  constructor(private router: Router, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Initialization logic goes here
    this.jazzerService.getAllCampaigns().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.campaigns = res.data;
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
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  createNewCampaign() {
    this.router.navigate(['/create-campaign']);
  }

  updateCampaign(data: any) {
    const index = this.campaigns.findIndex((campaign: any) => campaign._id === data._id);
    this.campaigns[index] = data;
  }

  execute(campaign: any) {

    console.log(campaign);
    this.jazzerService.execute(campaign).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          const {data} = res;
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

}
