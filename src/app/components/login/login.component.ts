import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JazzerService } from 'src/app/jazzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup<any>;

  constructor(private formBuilder: FormBuilder, private jazzerService: JazzerService, private _snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.jazzerService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', this.jazzerService.encrypt(res.data));
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }

  }
}
