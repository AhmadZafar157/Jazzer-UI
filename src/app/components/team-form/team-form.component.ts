import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JazzerService } from 'src/app/jazzer.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {

// masks = [{label:"Jazz", value:"Jazz"},{label:"JAZZ", value:"JAZZ"}]
// stakeholders = [{label:"adhoc", value:"adhoc"},{label:"ADHOC", value:"ADHOC"}]
// compaigns = [{label:"Prepaid", value:"Prepaid"},{label:"Postpaid", value:"Postpaid"}]
// channels = [{label:"SMS", value:"SMS"},{label:"Call", value:"Call"}]
// bases = [{label:"baseOne", value:"base1"},{label:"baseTwo", value:"base2"}]

teamFrom: FormGroup<any>;

constructor(private formBuilder: FormBuilder,private jazzerService: JazzerService, private router: Router, public dialogRef: MatDialogRef<TeamFormComponent>) {
  this.teamFrom = this.formBuilder.group({
    name: ['', [Validators.required]],
    shortCode: ['', [Validators.required]],
    capacity:['', [Validators.required]]
    // MASKING: ['', [Validators.required]],
    // stakeholder: ['', [Validators.required]],
    // BROADCAST_DATE:["",  [Validators.required]],
    // campaign_name:["",  [Validators.required]],
    // channel:["",  [Validators.required]],
    // base_list:["",  [Validators.required]],
    // submissionType:["",  [Validators.required]],
  });
}
onSubmit() {
  const formValues = this.teamFrom.value
  formValues.time_stamp = new Date().getTime();

  if (this.teamFrom.valid) {
    this.jazzerService.createTeam(formValues).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.dialogRef.close();
            const currentUrl = this.router.url;
            this.router.navigate([currentUrl], { skipLocationChange: true });
        }
      }
    );
  }
}
}

