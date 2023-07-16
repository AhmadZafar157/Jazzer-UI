import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JazzerService } from 'src/app/jazzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compaign-form',
  templateUrl: './compaign-form.component.html',
  styleUrls: ['./compaign-form.component.scss']
})
export class CompaignFormComponent {

  masks = [{label:"Jazz", value:"Jazz"},{label:"JAZZ", value:"JAZZ"}]
  stakeholders = [{label:"adhoc", value:"adhoc"},{label:"ADHOC", value:"ADHOC"}]
  compaigns = [{label:"Prepaid", value:"Prepaid"},{label:"Postpaid", value:"Postpaid"}]
  channels = [{label:"SMS", value:"SMS"},{label:"Call", value:"Call"}]
  bases = [{label:"baseOne", value:"base1"},{label:"baseTwo", value:"base2"}]

  campaignFrom: FormGroup<any>;

  constructor(private formBuilder: FormBuilder,private jazzerService: JazzerService, private router: Router) {
    this.campaignFrom = this.formBuilder.group({
      title: ['', [Validators.required]],
      sms_text: ['', [Validators.required]],
      MASKING: ['', [Validators.required]],
      stakeholder: ['', [Validators.required]],
      BROADCAST_DATE:["",  [Validators.required]],
      campaign_name:["",  [Validators.required]],
      channel:["",  [Validators.required]],
      base_list:["",  [Validators.required]],
      submissionType:["",  [Validators.required]],
    });
  }
  onSubmit() {
    const formValues = this.campaignFrom.value
    formValues.time_stamp = new Date().getTime();
    formValues.base_list = [formValues.base_list]
    console.log(formValues);

    if (this.campaignFrom.valid) {
      this.jazzerService.createCampaign(formValues).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            console.log(res);
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }
  }
}
