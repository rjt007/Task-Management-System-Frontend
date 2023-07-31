import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  newTask: Task = new Task();
  error:string = '';
  added:string='';

  constructor(private taskService: TaskService) {
  }
  addTask() {
    this.taskService.addTask(this.newTask).subscribe({
      complete: ()=>this.added = 'Task added successfully!',
      error:(err)=>this.error = err.error
    });
    this.newTask = new Task();
    setTimeout(()=>{
      this.error = '';
      this.added='';
    },4000);
  }
}
