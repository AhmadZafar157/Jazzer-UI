import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JazzerService } from 'src/app/jazzer.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent {
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

  baseForm: FormGroup<any>;

  constructor(private router: Router, private jazzerService: JazzerService, private formBuilder: FormBuilder) {
    this.baseForm = this.formBuilder.group({
      base_name: ['', [Validators.required]],
      max_stay_city: [[] ],
      regions: [[] ],
      minRev: ['' ],
      maxRev:["" ],
      minRech: ['' ],
      maxRech:["" ],
      minBal: ['' ],
      maxBal:["" ],
      minDor: ['' ],
      maxDor:["" ],
      dataProducts: [[] ],
      hybridProducts:[[] ],
      voiceProducts:[[] ],
      min2gDor: ['' ],
      max2gDor:["" ],
      min3gDor: ['' ],
      max3gDor:["" ],
      min4gDor: ['' ],
      max4gDor:["" ],
      simType: ['' ],
      
    });
  }
  onSubmit() {
    const formValues = this.baseForm.value;

    const payload = {
      max_stay_city: formValues.max_stay_city,
      base_name: formValues.base_name,
      Current_Balance: [formValues.minBal, formValues.maxBal],
      RECHARGE_DORMANCY: [formValues.minDor, formValues.maxDor]
    }
    console.log(payload);

    if (this.baseForm.valid) {
      this.jazzerService.createBase(payload).subscribe(
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
