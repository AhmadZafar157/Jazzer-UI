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
  teams:any[]=[]
  constructor(private formBuilder: FormBuilder, private jazzerService: JazzerService, private _snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      team: ['', [Validators.required]],
      user_type: ["non_cvm_type", [Validators.required]]
    });
  }
  ngOnInit(): void {
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
      const formValues = this.signupForm.value
      formValues.team_id=formValues.team[0]
      delete formValues.team
      this.jazzerService.signup(this.signupForm.value).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }
  }

}
