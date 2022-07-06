import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token-interceptor.service';


import {CompanyComponent} from './components/company/company.component';
import { UpdateComponent } from './components/company/update/update.component';
import { AddComponent } from './components/company/add/add.component';


import { JobComponent } from './components/job/job.component';
import { AddjobComponent } from './components/job/addjob/addjob.component';
import { EditjobComponent } from './components/job/editjob/editjob.component';

import { PeopleComponent } from './components/people/people.component';
import { AddpeopleComponent } from './components/people/addpeople/addpeople.component';
import { EditpeopleComponent } from './components/people/editpeople/editpeople.component';

import { SkillComponent } from './components/skill/skill.component';

import { TodoComponent } from './components/todo/todo.component';
import { AddtodoComponent } from './components/todo/addtodo/addtodo.component';
import { UpdatetodoComponent } from './components/todo/updatetodo/updatetodo.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoginComponent } from './components/login/login.component';


import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';






@NgModule({
  declarations: [
    AppComponent,

    CompanyComponent,
    UpdateComponent,
    AddComponent,

    JobComponent,
    AddjobComponent,
    EditjobComponent,

    PeopleComponent,
    AddpeopleComponent,
    EditpeopleComponent,

    SkillComponent,

    TodoComponent,
    AddtodoComponent,
    
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ConfirmComponent,
    UpdatetodoComponent,
    AddpeopleComponent,
    EditpeopleComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
