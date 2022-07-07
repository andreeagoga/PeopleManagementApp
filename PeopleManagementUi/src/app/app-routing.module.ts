import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { JobComponent } from './components/job/job.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddComponent } from './components/company/add/add.component';
import { CompanyComponent } from './components/company/company.component';
import { UpdateComponent } from './components/company/update/update.component';
import { AddjobComponent } from './components/job/addjob/addjob.component';
import { EditjobComponent } from './components/job/editjob/editjob.component';
import { PeopleComponent } from './components/people/people.component';
import { SkillComponent } from './components/skill/skill.component';
import { TodoComponent } from './components/todo/todo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddtodoComponent } from './components/todo/addtodo/addtodo.component';
import { UpdatetodoComponent } from './components/todo/updatetodo/updatetodo.component';
import { AddpeopleComponent } from './components/people/addpeople/addpeople.component';
import { EditpeopleComponent } from './components/people/editpeople/editpeople.component';  
import { AddskillComponent } from './components/skill/addskill/addskill.component';


const routes: Routes = [
  {
    path: 'todo',
    component: TodoComponent,
  },
  {
    path: 'todo/add',
    component: AddtodoComponent,
  },
  {
    path: 'todo/edit/:id',
    component: UpdatetodoComponent,
  },
  {
    path: 'company',
    component: CompanyComponent,
  },
  {
    path: 'company/add',
    component: AddComponent,
  },
  {
    path: 'company/:id/edit',
    component: UpdateComponent,
  },
  {
    path: 'company/:id/job',
    component: JobComponent,
  },
  {
    path: 'company/:id/job/add',
    component: AddjobComponent,
  },
  {
    path: 'company/:companyId/job/:jobId/edit',
    component: EditjobComponent,
  },
  {
    path: 'company/:companyId/job/:id/people',
    component: PeopleComponent,
  },
  {
    path: 'company/:companyId/job/:id/people/add',
    component: AddpeopleComponent,
  },
  {
    path: 'company/:companyId/job/:id/people/:peopleId/edit',
    component: EditpeopleComponent,
  },
  {
    path:  'company/:companyId/job/:jobId/people/:peopleId/skill/add',
    component: AddskillComponent,
  },
   {
    path: 'company/:companyId/job/:jobId/people/:peopleId/skill',
    component: SkillComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'auth/username',
    component: ConfirmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
