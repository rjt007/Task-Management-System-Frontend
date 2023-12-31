import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskHomeComponent} from './components/task-home/task-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ForgetComponent } from './components/forget/forget.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [

  { path: '', component:TaskHomeComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  {path:'create', component:AddTaskComponent},
  {path:'forget', component:ForgetComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
