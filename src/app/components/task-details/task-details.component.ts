import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input() task!:any;
  error:string = '';

  constructor(private taskService: TaskService, private router:Router) {
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
  });
  }

  updateTaskStatus(taskID: any, newStatus: string) {
    this.taskService.updateTaskStatus(taskID, newStatus).subscribe({
      complete:()=>this.refreshPage(),
      error: (err)=>this.error = err
    });
  }

  deleteTask(taskID: any) {
    this.taskService.deleteTask(taskID).subscribe({
      complete:()=>this.refreshPage(),
      error: (err)=>this.error = err
    });
  }
}
