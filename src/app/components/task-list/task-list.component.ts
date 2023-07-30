import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: any[] = [];
  error:string='';
  sortingOption: string = 'dueDate'; // Default sorting option

  constructor(private taskService: TaskService) {
        this.taskService.getAllTasks().subscribe({
          next: (data)=> this.tasks = data,
          error: (err)=> console.log(err)
        });
  }

  onSortOptionChange(option: string) {
    this.sortingOption = option;
  }
  sortedTasks(): any[] {
    return this.taskService.getSortedTasks(this.tasks, this.sortingOption);
  }

  exportToCSV() {
    this.taskService.exportTaskToCSV(this.tasks);
  }
}
