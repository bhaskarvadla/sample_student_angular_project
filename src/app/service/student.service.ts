import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/students';

  getStudents() {

    return this.http.get<Student[]>(this.baseUrl);
  }
  deleteStudents(id: number) {
    return this.http.delete<Student>(this.baseUrl + '/' + + id);
  }
  createUser(student: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.baseUrl, student, httpOptions);
  }
  getStudentById(id: number) {
    return this.http.get<Student>(this.baseUrl + '/' + id);
  }
  updateStudent(student: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.baseUrl, student, httpOptions);
  }
}
