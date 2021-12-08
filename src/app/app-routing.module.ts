import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {StudentListComponent} from './components/student-list/student-list.component';
import {AddStudentComponent} from './components/add-student/add-student.component';
import {AboutComponent} from './components/about/about.component';

export const routes: Routes = [
  {path: 'home', component: StudentListComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'view-student', component: StudentListComponent},
  {path: 'add-student', component: AddStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
