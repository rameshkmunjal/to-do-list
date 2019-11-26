import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';


import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'allTasks', component:AllTasksComponent},
      {path:'create-task', component:CreateTaskComponent}
    ])
  ],
  declarations: [    
    AllTasksComponent, 
    SingleTaskComponent, 
    CreateTaskComponent
  ]
})
export class TaskModule { }
