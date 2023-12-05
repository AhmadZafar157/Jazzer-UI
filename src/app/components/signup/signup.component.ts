import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup<any>;
  teams:any[]=[];
  user: any;
  constructor(private formBuilder: FormBuilder, private jazzerService: JazzerService, private _snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      team: ['', []],
      user_type: ["non_cvm_type", []]
    });
  }
  ngOnInit(): void {
    this.jazzerService.getCurrentUser().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.user = res.data;
          // console.log('in signup -> ' + JSON.stringify(this.user));
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );

    this.jazzerService.getTeam().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.teams=res.data;
          // this.teams= this.teams.map((element:any)=>element.shortCode);
          console.log(this.teams)
        }
      }
    );
  }
  onSubmit() {
    if (this.signupForm.valid) {
      // const formValues = this.signupForm.value
      // formValues.team_id=formValues.team[0]
      // delete formValues.team

      if (this.user.user_type != 'super_admin') {
        this.signupForm.value.team_id = this.user.team_id;
      } else {
        this.signupForm.value.team_id = this.signupForm.value.team[0];
      }
      
      this.jazzerService.signup(this.signupForm.value).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/home']);
          }
        }
      );
    }
  }

}
