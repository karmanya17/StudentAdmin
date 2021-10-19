import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentsearchComponent } from './studentsearch/studentsearch.component';
const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"create-student",
    component:StudentCreateComponent
  },
  {
    path:"student-list",
    component:StudentListComponent
  },
  {
    path:"student-edit/:id",
    component:StudentEditComponent
  },
  {
    path:"student-search",
    component:StudentsearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
