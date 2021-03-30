import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { StudentsComponentComponent } from './students-component/students-component.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { DeleteStudentDialogComponent } from './shared/dialogs/delete-student-dialog/delete-student-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReportsComponent } from './reports/reports.component';
import { MatTableModule } from '@angular/material/table';
import { CreateStudentDialogComponent } from './shared/dialogs/create-student-dialog/create-student-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponentComponent,
    DeleteStudentDialogComponent,
    ReportsComponent,
    CreateStudentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  entryComponents: [
    StudentsComponentComponent,
    DeleteStudentDialogComponent,
    ReportsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
