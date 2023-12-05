import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-show-campaign',
  templateUrl: './show-campaign.component.html',
  styleUrls: ['./show-campaign.component.scss']
})
export class ShowCampaignComponent implements OnInit {
  currentCampaign: any
  constructor(private dialogRef: MatDialogRef<ShowCampaignComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log(this.data.campaign);
    this.currentCampaign = this.data.campaign.campaignInfo;
  }
}