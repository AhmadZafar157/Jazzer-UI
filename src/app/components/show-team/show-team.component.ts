import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.scss']
})
export class ShowTeamComponent {
  currentTeam: any
  constructor(private dialogRef: MatDialogRef<ShowTeamComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.currentTeam = this.data.team.teamRef;
    console.log(this.currentTeam);
  }
}