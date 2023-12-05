import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JazzerService } from 'src/app/jazzer.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  baseForm: FormGroup<any>;
  
  constructor(private _snackBar: MatSnackBar, private jazzerService: JazzerService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<BaseFormComponent>) {
    this.baseForm = this.formBuilder.group({
      base_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      table_name: ['', [Validators.required]],
      capping: ['', [Validators.required]],

    });
  }
  ngOnInit(): void {

  }

  onSubmit() {
    const formValues = this.baseForm.value;

    if (this.baseForm.valid) {
      this.jazzerService.createBase(formValues).subscribe(
        (res) => {
          if (res.statusCode == 200) {
            this.dialogRef.close();

            this.jazzerService.baseChange.next(1);
          }
        }
      );
    }
    else {
      this._snackBar.open("Something went wrong!", "", {
        duration: 3000
      });
    }
  }
}
