import { Component, Inject, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/service/student.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { StudentForm } from 'src/app/model/FormGroup';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  submitted = false;
  public createStudentForm: FormGroup;

  constructor(private stdService: StudentService,
    private router: Router,
    public dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data.editMode === 2) {
      this.createStudentForm = StudentForm.createWithValues(this.data.data);
      console.log('created form with values', this.createStudentForm.value);
    } else if (this.data.editMode === 1) {
      this.createStudentForm = StudentForm.create();
    }
  }

  saveData(value: any): void {
    console.log('Form Data in save method', value);
    // this.stdService.createUser(value)
    //   .subscribe(() => {
    //     // this.students = data;

    // this.router.navigate(['view-student']);
    //   });

    this.dialogRef.close(value);
  }

  createProduct(): void {
    // const data = {
    //   name: this.product.firstName,
    //   description: this.product.lastName
    // };

    this.router.navigate(['view-student']);
    // this.stdService.createUser()
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.submitted = true;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  newProduct(): void {
    this.submitted = false;
    // this.product = {
    //   firstName: '',
    //   lastName: '',
    //   class: ''
    // };
  }

  closeDialog(): void {
    this.createStudentForm.reset();
  }

  updateData(value: any): void {
    console.log('Form Data in update method', value);
    
    this.dialogRef.close(value);
  }
}
