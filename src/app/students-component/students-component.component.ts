import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../app/interfaces/student.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      disableClose: true,
      width: '550px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
  styleUrls: ['./students-component.component.scss'],
})
export class DialogElementsExampleDialog implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  public studentForm: FormGroup;

  public studentAge: string = 'año(s) mes(es)';

  public maxDate: Date = new Date();

  ngOnInit() {
    this.studentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      fathLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      mothLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      grado: new FormControl('', [Validators.required]),
      birthDate: new FormControl(new Date(), [Validators.required]),
      picture: new FormControl('', []),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  };

  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public createStudent = (studentFormValue: any) => {
    console.log(this.studentForm.valid);
    if (this.studentForm.valid) {
      this.executeStudentCreation(studentFormValue);
    }
  };

  public calculateAge = (birthDate: Date) => {
    const diff = Date.now() - birthDate.getTime();
    const age_date = new Date(diff);
    const year = age_date.getUTCFullYear();
    const months = age_date.getUTCMonth();
    const age = Math.abs(year - 1970);
    const text_age = age > 1 || age == 0 ? 'años' : 'año';
    const text_months = months > 1 || months == 0 ? 'meses' : 'mes';
    return `${age} ${text_age} ${months} ${text_months}`;
  };

  changeDOB(event: MatDatepickerInputEvent<Date>) {
    this.studentAge = this.calculateAge(event.value!!);
  }

  private executeStudentCreation = (studentFormValue: any) => {
    let student: Student = {
      name: studentFormValue.name,
      fathLastName: studentFormValue.fathLastName,
      mothLastName: studentFormValue.mothLastName,
      grado: studentFormValue.grado,
      birthDate: studentFormValue.birthDate,
      picture: studentFormValue.picture,
    };

    console.log(student);
    console.log(this.calculateAge(student.birthDate));
  };

  closeDialog(): void {
    this.dialogRef.close();
  }
}
