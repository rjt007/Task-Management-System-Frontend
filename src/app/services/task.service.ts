import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://task-management-system-service.onrender.com/tasks';

  constructor(private http: HttpClient) { }

  //Get all tasks for specific user
  getAllTasks(): Observable<any>{
    const accessToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  //Add new task
  addTask(taskData: any): Observable<any> {
    const accessToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.post<any>(this.apiUrl, taskData, { headers });
  }

  //Update Task status
  updateTaskStatus(id: any, status: string): Observable<any> {
    return this.http.put<any>(this.apiUrl,{id,status});
  }

  //Delete Task
  deleteTask(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  //Sort Tasks
  getSortedTasks(tasks:any[], sortingOption:string): any[]{
    return tasks.slice().sort((task1, task2) => {
      if (sortingOption === 'dueDate') {
        return new Date(task1.dueDate).getTime() - new Date(task2.dueDate).getTime();
      } else if (sortingOption === 'priority') {
        const priorityOrder:any = { 'low': 1, 'medium': 2, 'high': 3 };
        return priorityOrder[task1.priority] - priorityOrder[task2.priority];
      } else if (sortingOption === 'status') {
        const statusOrder:any = { 'TODO': 1, 'IN_PROGRESS': 2, 'COMPLETED': 3 };
        return statusOrder[task1.status] - statusOrder[task2.status];
      }
      return 0;
    });
  }
    //EXPORT TO CSV 
    exportTaskToCSV(task:any[]){
      const csvContent = this.convertArrayToCSV(task);
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'tasks.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    private convertArrayToCSV(data: any[]): string {
      const csvHeader = 'Title,Description,Due Date,Priority,Status\n';
      const csvData = data.map(task => {
        return `${task.title},"${task.description}",${task.dueDate},${task.priority},${task.status}`;
      }).join('\n');
  
      return csvHeader + csvData;
    }
}
