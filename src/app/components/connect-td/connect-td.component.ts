import { Component } from '@angular/core';
import { JazzerService } from 'src/app/jazzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connect-td',
  templateUrl: './connect-td.component.html',
  styleUrls: ['./connect-td.component.scss']
})

export class ConnectTdComponent {

  existing_TD_credentials: any;
  addNew: boolean;
  addTDForm: FormGroup<any>;

  constructor(private formBuilder: FormBuilder, private jazzerService: JazzerService, private _snackBar: MatSnackBar) {
    this.addNew = false;
    this.addTDForm = this.formBuilder.group({
      host: ['', [Validators.required]],
      database: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Initialization logic goes here
    this.jazzerService.getAll_TD_credentials().subscribe(
      (res) => {
        if (res.statusCode == 200) {
          this.existing_TD_credentials = res.data
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  updateCred (credential: any) {
    const index = this.existing_TD_credentials.findIndex((cred: any) => cred._id === credential._id);
    this.existing_TD_credentials[index] = credential;
  }

  connectToTD(credentials: any) {
    // console.log(credentials);
    this.jazzerService.connectTD(credentials).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          console.log('Connect -> ' + res);
          this.updateCred(res.data)
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  disconnectFromTD(credentials: any) {
    // console.log(credentials);
    this.jazzerService.disconnectTD(credentials).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          console.log('Disconnect -> ' + res);
          this.updateCred(res.data)
        }
      },
      (err) => {
        this._snackBar.open(err.message, "OK", {
          duration: 3000
        });
      }
    );
  }

  onAddNew() {
    this.addNew = true;
  }

  onSubmit() {
    if (this.addTDForm.valid) {
      console.log(this.addTDForm.value);
      this.addNew = false;

      this.jazzerService.addNewTDCredential(this.addTDForm.value).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            const { data } = res;
            this.existing_TD_credentials.push(data);
          }
        },
        (err) => {
          this._snackBar.open(err.message, "OK", {
            duration: 3000
          });
        }
      );
    }
  }
}
