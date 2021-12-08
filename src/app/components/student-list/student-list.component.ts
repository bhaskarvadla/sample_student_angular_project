import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default


})

export class StudentListComponent implements OnInit {
  users: any = [
    { firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', class: 'User' },
    { firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', class: 'Admin' },
    { firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', class: 'Admin' },
    { firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', class: 'User' },
    { firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', class: 'User' }
  ];
  students: any;
  displayedColumns: string[] = ['firstName', 'secondName', 'emailId', 'stdClass'];

  showMsg: boolean = false;
  constructor(private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private stdService: StudentService) {
      
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.studentService.getStudents()
      .subscribe((data: Student[]) => {
        this.students = data;
      });
  }
  openCreateStudentForm(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '700px',
      height: '450px',
      data: {
        data: undefined,
        editMode: 1  //Create Mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Create Dialog closed', result);
      // TODO call create student api service
      // TODO after calling create student api call list students api to update table data
      this.stdService.createUser(result)
        .subscribe(() => {
          // this.students = data;

          window.location.reload();
          this.showMsg = true;
          // this.router.navigate(['view-student']);
        });

      this.changeDetectorRefs.detectChanges();
    });
  }
  DeleteStudent(element: any): void {
    console.log('In Delete Student info', element);
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      height: '150px',
      data: {
        firstName: element.firstName,
        stdId: element.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete Dailog closed', result);
        // TODO call delete api
        // TODO call reload table data
        if (result == 2) {
          this.studentService.deleteStudents(element.id)
            .subscribe(() => {
            });
    
      } else if (result === 1) {
        // TODO nothing
      }
      window.location.reload();

      this.changeDetectorRefs.detectChanges();
    });
  }

  updateStudentInfo(element: any): void {
    console.log('In Update Student info', element);
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '700px',
      height: '450px',
      data: {
        data: element,
        editMode: 2  // Update Mode
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Updated Dailog closed', result);
      // TODO call update api
      // TODO reload the table data
      this.stdService.updateStudent(result)
        .subscribe(() => {
          // this.students = data;
          this.router.navigate(['view-student']);
        });

        window.location.reload();
      this.changeDetectorRefs.detectChanges();
    });
  }
}


@Component({
  selector: 'app-delete-component-dialog',
  template: 'Are you sure to delete this student <b>{{ this.data.firstName}}</b>' +
    '<div mat-dialog-actions >\n' +
    '        <button mat-raised-button color="primary" (click)="closeDialog(2)">Delete' +
    '        </button>\n' +
    '        <button mat-raised-button (click)="closeDialog(1)" [mat-dialog-close]="true">Cancle</button>\n' +
    '      </div>',
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService) { }

  closeDialog(value: any): void {
    this.dialogRef.close(value);

  }
}
