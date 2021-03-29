import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-students-component',
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.scss'],
})
export class StudentsComponentComponent implements OnInit {
  searchValue: string = '';
  iterations: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  animal: string= '';
  name: string= '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '550px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {}
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-student-component.component.html',
})
export class DialogElementsExampleDialog {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
