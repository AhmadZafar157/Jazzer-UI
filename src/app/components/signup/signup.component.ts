import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup<any>;

  constructor(private formBuilder: FormBuilder, private jazzerService: JazzerService, private _snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      user_type: ["non-cvm", [Validators.required]]
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      this.jazzerService.signup(this.signupForm.value).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            localStorage.setItem('token', res.data.token);
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }
  }
}
