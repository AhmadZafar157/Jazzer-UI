import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-base',
  templateUrl: './show-base.component.html',
  styleUrls: ['./show-base.component.scss']
})
export class ShowBaseComponent implements OnInit {
  currentBase: any
  constructor(private dialogRef: MatDialogRef<ShowBaseComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log(this.data.base)
    this.currentBase = this.data.base;
  }

  objectToArray(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key, value: obj[key] }));
  }
}
