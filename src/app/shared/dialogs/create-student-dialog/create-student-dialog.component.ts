import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../../app/interfaces/student.model';
import { Grado } from '../../../../app/interfaces/grado.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Service } from './../../../shared/service';

@Component({
  selector: 'app-create-student-dialog',
  templateUrl: './create-student-dialog.component.html',
  styleUrls: ['./create-student-dialog.component.scss'],
})
export class CreateStudentDialogComponent implements OnInit {
  public grados: Grado[] = [];

  public studentForm: FormGroup;

  public studentAge: string = 'año(s) mes(es)';

  public maxDate: Date = new Date();

  public image: any;

  constructor(
    public dialogRef: MatDialogRef<CreateStudentDialogComponent>,
    private service: Service
  ) {}

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
      birthDate: new FormControl('', [Validators.required]),
      picture: new FormControl('', []),
    });

    this.getGrados();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  };

  public createStudent = (studentFormValue: any) => {
    if (this.studentForm.valid) {
      this.executeStudentCreation(studentFormValue);
    }
  };

  private getGrados = async () => {
    const res = await this.service.get('/api/grados');
    this.grados = res;
  };

  public selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

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

  private executeStudentCreation = async (studentFormValue: any) => {
    var formData = new FormData();
    formData.append('file', this.image);
    let student: Student = {
      nid_persona: studentFormValue.nid_persona,
      nom_persona: studentFormValue.name,
      ape_pate_pers: studentFormValue.fathLastName,
      ape_mate_pers: studentFormValue.mothLastName,
      nid_grado: studentFormValue.grado,
      fecha_naci: studentFormValue.birthDate,
      foto_ruta: '',
    };
    formData.append('student', JSON.stringify(student));

    this.service.upload('api/student/new', formData).subscribe(
      (res) => {
        student.foto_ruta = res.toString();
        this.dialogRef.close(student);
      },
      (err) => console.log(err)
    );
  };

  closeDialog(): void {
    this.dialogRef.close();
  }
}
