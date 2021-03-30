import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Service } from '../../../shared/service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DeleteData {
  nid_persona: number;
}

@Component({
  selector: 'app-delete-student-dialog',
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.scss'],
})
export class DeleteStudentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteData,
    private service: Service,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  public async deleteStudent() {
    const nid_persona = this.data.nid_persona;
    const res = await this.service.delete(`/api/student/delete/${nid_persona}`);
    this._snackBar.open('Estudiante Eliminado', 'Eliminado', {
      duration: 2000,
    });
    this.dialogRef.close(nid_persona);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
