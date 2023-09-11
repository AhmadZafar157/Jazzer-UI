import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JazzerService } from 'src/app/jazzer.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compaign-form',
  templateUrl: './compaign-form.component.html',
  styleUrls: ['./compaign-form.component.scss']
})
export class CompaignFormComponent {

  masks = [{ label: "Jazz", value: "Jazz" }, { label: "JAZZ", value: "JAZZ" }]
  stakeholders = [{ label: "adhoc", value: "adhoc" }, { label: "ADHOC", value: "ADHOC" }]
  compaigns = [{ label: "Prepaid", value: "Prepaid" }, { label: "Postpaid", value: "Postpaid" }]
  channels = [{ label: "SMS", value: "SMS" }, { label: "Call", value: "Call" }]
  bases = [{ label: "", value: "" }]
  user: any = null;

  campaignFrom: FormGroup<any>;

  constructor(private formBuilder: FormBuilder, private jazzerService: JazzerService, private router: Router, public dialogRef: MatDialogRef<CompaignFormComponent>) {
    this.campaignFrom = this.formBuilder.group({
      title: ['', [Validators.required]],
      sms_text: ['', [Validators.required]],
      MASKING: ['', [Validators.required]],
      // stakeholder: ['', [Validators.required]],
      BROADCAST_DATE: ["", [Validators.required]],
      campaign_name: ["", [Validators.required]],
      // channel:["",  [Validators.required]],
      base_list: ["", [Validators.required]],
      submissionType: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.jazzerService.getCurrentUser().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.user = res.data;
          console.log(this.user);
        }
      },
      (err) => {
        // this._snackBar.open(err.message, "OK", {
        //   duration: 3000
        // });
      }
    );

    this.jazzerService.getAllBases().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.bases = res.data.map((base: any) => {
            return {
              label: base.base_name, value: base.table_name
            }
          });
          console.log(this.bases);
        }
      }
    );
  }

  onSubmit() {
    const formValues = this.campaignFrom.value;
    console.log(formValues);
    formValues.time_stamp = new Date().getTime();
    formValues.TABLE_NAME = formValues.base_list;
console.log("I am not valid");
    if (this.campaignFrom.valid) {
      this.jazzerService.createCampaign(formValues).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.dialogRef.close();
            this.jazzerService.campaignChange.next(1);
          }
        }
      );
    }
  }
}
