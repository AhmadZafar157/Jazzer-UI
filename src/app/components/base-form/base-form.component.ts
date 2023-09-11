import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JazzerService } from 'src/app/jazzer.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit{
  cities = new FormControl('');
  citiesList: string[] = ['Sialkot', 'Kohat', 'Abbotabad', 'Islamabad', 'Karachi', 'Peshawar'];

  regions = new FormControl('');
  regionsList: string[] = ['Central 2', 'North 1', 'GB', 'South', 'North', 'Central'];

  dataProducts = new FormControl('');
  dataProductsList: string[] = ['ALLINONE5G', 'MAXUSAGE', 'MULTIPLAY4G', 'MAXOFFER3G', 'DAILY4G', 'MAX3G'];

  hybridProducts = new FormControl('');
  hybridProductsList: string[] = ['WEEKLYOFFER', 'HYBRIDDATA3G', 'HYBRID5G', 'HYBRID2G', 'HBRID3G', '4GHUBRID'];

  voiceProducts = new FormControl('');
  voiceProductsList: string[] = ['MONTHLYBUNDLE', '20MINSFREE', 'MAXBUNDLE', 'MAXVOICE', 'SUNADO', 'KEHDO'];

  paids=[{label:"Pre Paid", value:'prepaid'},{label:"Postpaid", value:1}]
user:any=null;
  baseForm: FormGroup<any>;
  formType:string="reduced"
  remainingCapacity: number=-1;
  constructor(private _snackBar:MatSnackBar ,private router: Router, private jazzerService: JazzerService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<BaseFormComponent>) {
    this.baseForm = this.formBuilder.group({
      base_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      table_name: ['', ],
      max_stay_city: [[] ],
      regions: [[] ],
      minRev: ['' ],
      maxRev:["" ],
      minRech: ['' ],
      maxRech:["" ],
      minBal: ['' ],
      maxBal:["" ],
      minDor: ["" ],
      maxDor:["" ],
      dataProducts: [[] ],
      hybridProducts:[[] ],
      voiceProducts:[[] ],
      min2gDor: ["" ],
      max2gDor:["" ],
      min3gDor: ["" ],
      max3gDor:["" ],
      min4gDor: ['' ],
      max4gDor:["" ],
      simType: ['' ],
      capping: ['', [Validators.required]],
      
    });
  }
  ngOnInit(): void {
    this.formType = this.jazzerService.getBaseForm()
    this.user= this.jazzerService.decrypt(localStorage.getItem('user'));
    if(this.user.team_id)
    {
      this.jazzerService.getTeamById(this.user.team_id).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            console.log(res);
            this.remainingCapacity=res.data.remainingCapacity
            console.log(this.remainingCapacity,"  ",res.data.remainingCapacity)
          }
        }
      );
    }
  }
  onSubmit() {
    const formValues = this.baseForm.value;

    const payload = {
      max_stay_city: formValues.max_stay_city,
      description: formValues.description,
      base_name: formValues.base_name,
      Current_Balance: [formValues.minBal, formValues.maxBal],
      capping: formValues.capping,
      table_name: formValues.table_name,
      RECHARGE_DORMANCY: [formValues.minDor, formValues.maxDor],
      Revenue_30_Days: [formValues.minRev, formValues.maxRev]
    }
    // console.log(payload);

    if (this.baseForm.valid) {
      this.jazzerService.createBase(payload).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.dialogRef.close();

            this.jazzerService.baseChange.next(1);

            // const currentUrl = this.router.url;
            // this.router.navigate([currentUrl], { skipLocationChange: true });
          }
        }
      );
    }
    else{
      this._snackBar.open("Something went wrong!", "", {
        duration: 3000
      });
    }
  }
}
