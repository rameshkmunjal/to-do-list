import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  public allTasksList:any=[
    {
      task:"Budget 2020-21 preparation",
      taskDetails:"Budget Important Growth over previous FY - Net Profit :15%, Advances:20%, Deposits:15%; Other Income:30%", 
      startDate:"21-10-2019", 
      dueDate:"25-10-2019", 
      priority:"High", 
      status:"In Progress", 
      tag:"Planning",
      assignee:"Ramesh Munjal"
    },
    {
      task:"Budget 2020-21 preparation",
      taskDetails:"Budget Important Growth over previous FY - Net Profit :15%, Advances:20%, Deposits:15%; Other Income:30%", 
      startDate:"21-10-2019", 
      dueDate:"25-10-2019", 
      priority:"High", 
      status:"In Progress", 
      tag:"Planning",
      assignee:"Ramesh Munjal"
    },
    {
      task:"Budget 2020-21 preparation",
      taskDetails:"Budget Important Growth over previous FY - Net Profit :15%, Advances:20%, Deposits:15%; Other Income:30%", 
      startDate:"21-10-2019", 
      dueDate:"25-10-2019", 
      priority:"High", 
      status:"In Progress", 
      tag:"Planning",
      assignee:"Ramesh Munjal"
    },
    {
      task:"Budget 2020-21 preparation",
      taskDetails:"Budget Important Growth over previous FY - Net Profit :15%, Advances:20%, Deposits:15%; Other Income:30%", 
      startDate:"21-10-2019", 
      dueDate:"25-10-2019", 
      priority:"High", 
      status:"In Progress", 
      tag:"Planning",
      assignee:"Ramesh Munjal"
    },
    {
      task:"Budget 2020-21 preparation",
      taskDetails:"Budget Important Growth over previous FY - Net Profit :15%, Advances:20%, Deposits:15%; Other Income:30%", 
      startDate:"21-10-2019", 
      dueDate:"25-10-2019", 
      priority:"High", 
      status:"In Progress", 
      tag:"Planning",
      assignee:"Ramesh Munjal"
    },
    {
      task:"Budget 2020-21 preparation",
      taskDetails:"Budget Important Growth over previous FY - Net Profit :15%, Advances:20%, Deposits:15%; Other Income:30%", 
      startDate:"21-10-2019", 
      dueDate:"25-10-2019", 
      priority:"High", 
      status:"In Progress", 
      tag:"Planning",
      assignee:"Ramesh Munjal"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
