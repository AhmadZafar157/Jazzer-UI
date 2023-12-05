import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { JazzerService } from '../../jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-base',
  templateUrl: './create-new-base.component.html',
  styleUrls: ['./create-new-base.component.scss']
})
export class CreateNewBaseComponent implements OnInit {
  valueSegmentConfig: any;
  createBaseFrom!: FormGroup<any>;
  handsetModelConfig: any;
  FourgUsers: any = [{label:"Yes", value: 1},{label:"No", value: 0}];
  simTypeConfig: any;
  handsetBrandConfig: any;
  minBalance: number= 10;
  maxBalance: number= 10;
  maxStayCityConfig: any;
  maxStayRegionConfig: any;
  maxStayZoneConfig: any;
  productConfig: any;
  user: any;

  constructor(private formBuilder: FormBuilder,private router: Router, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {
    
  }
  ngOnInit(): void {
    this.user = this.jazzerService.decrypt(localStorage.getItem('user'));
    console.log(this.user.team.remainingCapacity)
      this.jazzerService.getSegmentsConfig().subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.valueSegmentConfig = res.data.valueSegmentConfig
            this.handsetModelConfig = res.data.handsetModelConfig
            this.simTypeConfig = res.data.simTypeConfig;
            this.handsetBrandConfig = res.data.handsetBrandConfig;
            this.maxStayCityConfig = res.data.maxStayCityConfig;
            this.maxStayRegionConfig = res.data.maxStayRegionConfig;
            this.maxStayZoneConfig = res.data.maxStayZoneConfig;
            this.productConfig = res.data.productConfig;
          }
        },
        (err) => {
          this._snackBar.open(err.message, "OK", {
            duration: 3000
          });
        }
      );
      this.createBaseFrom = this.formBuilder.group({
        base_name: ['',[Validators.required]],
        description:['',[Validators.required]],
        capping:['',[Validators.required]],
        value_segment: [[]],
        handset_model: [[]],
        handset_brand: [[]],
        max_stay_city: [[]],
        maz_stay_region: [[]],
        max_stay_zone: [[]],
        minBalance: [0],
        maxBalance: [0],
        minActivity: [0],
        maxActivity: [0],
        sub_offering_group_w1: ['',[Validators.required]],
        sim_4g:[''],
        maxRechargeMin: [0],
        totalRechargeMin: [0],
        avgRechargeMin: [0],
        thirtyDayRevenueMin: [0],
        thirtyToSixtyDayRevenueMin: [0],
        voiceThirtyDayRevenueMin: [0],
        maxRechargeMax: [0],
        totalRechargeMax: [0],
        avgRechargeMax: [0],
        thirtyDayRevenueMax: [0],
        thirtyToSixtyDayRevenueMax: [0],
        voiceThirtyDayRevenueMax: [0],
        rechargeDormancyMin: [0],
        rechargeDormancyMax: [0],
        dormancyMin: [0],
        dormancyMax: [0],
        twoGDormancyMin: [0],
        twoGDormancyMax: [0],
        threeGDormancyMin: [0],
        threeGDormancyMax: [0],
        fourGDormancyMin: [0],
        fourGDormancyMax: [0],
        comrcl_name:[[]],
        jazz_world: [],
        jazz_cash: [],
        BIP: [],
        tamasha:[],
        bajao: [],
        game_now: []
      });
  
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  onSubmit(){
    const formValues = this.createBaseFrom.value;

    formValues.current_balance = [formValues.minBalance, formValues.maxBalance]
    delete formValues.minBalance;
    delete formValues.maxBalance;

    formValues.activeDays_30_days = [formValues.minActivity, formValues.maxActivity]
    delete formValues.minActivity;
    delete formValues.maxActivity;

    formValues.recharge_max_30_days = [formValues.maxRechargeMin, formValues.maxRechargeMax]
    delete formValues.maxRechargeMin;
    delete formValues.maxRechargeMax;
    
    formValues.recharge_30_days = [formValues.totalRechargeMin, formValues.totalRechargeMax]
    delete formValues.totalRechargeMin;
    delete formValues.totalRechargeMax;
    
    formValues.recharge_average_monthly = [formValues.avgRechargeMin, formValues.avgRechargeMax]
    delete formValues.avgRechargeMin;
    delete formValues.avgRechargeMax;
    
    formValues.revenue_30_days = [formValues.thirtyDayRevenueMin, formValues.thirtyDayRevenueMax]
    delete formValues.thirtyDayRevenueMin;
    delete formValues.thirtyDayRevenueMax;
    
    formValues.revenue_31_60_days = [formValues.thirtyToSixtyDayRevenueMin, formValues.thirtyToSixtyDayRevenueMax]
    delete formValues.thirtyToSixtyDayRevenueMin;
    delete formValues.thirtyToSixtyDayRevenueMax;
    
    formValues.revenue_voice_30_days = [formValues.voiceThirtyDayRevenueMin, formValues.voiceThirtyDayRevenueMax]
    delete formValues.voiceThirtyDayRevenueMin;
    delete formValues.voiceThirtyDayRevenueMax;

    
    formValues.recharge_dormancy = [formValues.rechargeDormancyMin, formValues.rechargeDormancyMax]
    delete formValues.rechargeDormancyMin;
    delete formValues.rechargeDormancyMax;
    
    formValues.dormant_days = [formValues.dormancyMin, formValues.dormancyMax]
    delete formValues.dormancyMin;
    delete formValues.dormancyMax;

    
    formValues.dormant_2g = [formValues.twoGDormancyMin, formValues.twoGDormancyMax]
    delete formValues.twoGDormancyMin;
    delete formValues.twoGDormancyMax;

    formValues.dormant_3g = [formValues.threeGDormancyMin, formValues.threeGDormancyMax]
    delete formValues.threeGDormancyMin;
    delete formValues.threeGDormancyMax;

    formValues.dormant_4g = [formValues.fourGDormancyMin, formValues.fourGDormancyMax]
    delete formValues.fourGDormancyMin;
    delete formValues.fourGDormancyMax;

    formValues.jazz_cash = formValues.jazz_cash ? 1 : 0;
    formValues.jazz_world = formValues.jazz_world ? 1 : 0;
    formValues.BIP = formValues.BIP ? 1 : 0;
    formValues.bajao = formValues.bajao ? 1 : 0;
    formValues.tamasha = formValues.tamasha ? 1 : 0;
    formValues.game_now = formValues.game_now ? 1 : 0;

    console.log(formValues);
    if (this.createBaseFrom.valid) {
      this.jazzerService.createBase(formValues).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            

            this.router.navigate(["/home/segments"])

            // const currentUrl = this.router.url;
            // this.router.navigate([currentUrl], { skipLocationChange: true });
          }
        }
      );
    }
    else {
      this._snackBar.open("Error! Invalid Inputs , check capping and sim type ...", "", {
        duration: 3000
      });
    }
  }
}
