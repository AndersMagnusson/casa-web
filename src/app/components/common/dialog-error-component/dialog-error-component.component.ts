import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorDisplay } from '../../../models';

@Component({
  selector: 'app-dialog-error-component',
  templateUrl: './dialog-error-component.component.html',
  styleUrls: ['./dialog-error-component.component.css']
})
export class DialogErrorComponentComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public error: ErrorDisplay) {
  }

  ngOnInit() {
  }

  onOk(): void {
    this.dialogRef.close();
  }
}
