import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../app/interfaces/student.model';
import { Grado } from '../../app/interfaces/grado.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Service } from './../shared/service';
import { DeleteStudentDialogComponent } from '../shared/dialogs/delete-student-dialog/delete-student-dialog.component';
import { CreateStudentDialogComponent } from '../shared/dialogs/create-student-dialog/create-student-dialog.component';

@Component({
  selector: 'app-students-component',
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.scss'],
})
export class StudentsComponentComponent implements OnInit {
  searchValue: string = '';

  public students: Student[] = [];

  public temp_students: Student[] = [];

  constructor(public dialog: MatDialog, private service: Service) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateStudentDialogComponent, {
      disableClose: true,
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.temp_students.push(result);
    });
  }

  openDeleteDialog(nid_persona: number): void {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      disableClose: true,
      width: '400px',
      data: { nid_persona: nid_persona },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.temp_students = this.temp_students.filter(
          (student) => student.nid_persona !== result
        );
      }
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  onSearchChange(): void {
    const searchValue = this.cleanData(this.searchValue);
    this.temp_students = this.students.filter((student) => {
      const student_name = this.cleanData(student.nom_persona);
      const student_fLast = this.cleanData(student.ape_pate_pers);
      const student_mLast = this.cleanData(student.ape_mate_pers);
      return (
        student_name.indexOf(searchValue) > -1 ||
        student_fLast.indexOf(searchValue) > -1 ||
        student_mLast.indexOf(searchValue) > -1
      );
    });
  }

  cleanData(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private getStudents = async () => {
    const res = await this.service.get('/api/students');
    this.students = res;
    this.temp_students = res;
  };

  public calculateAge = (birthDate: Date) => {
    const diff = Date.now() - new Date(birthDate).getTime();
    const age_date = new Date(diff);
    const year = age_date.getUTCFullYear();
    const months = age_date.getUTCMonth();
    const age = Math.abs(year - 1970);
    const text_age = age > 1 || age == 0 ? 'años' : 'año';
    const text_months = months > 1 || months == 0 ? 'meses' : 'mes';
    return `${age} ${text_age} ${months} ${text_months}`;
  };
}
