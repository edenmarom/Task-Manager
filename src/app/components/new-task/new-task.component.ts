import { Component } from '@angular/core';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  newTask = {
    name: '',
    description: '',
    status: 'To Do',
  };

  constructor() {}

  addTask() {
    // Here you would typically add the task to your task list or send it to a backend service.
    console.log('New task:', this.newTask);

    // Redirect to the tasks page
    // this.router.navigate(['/']);
  }
}
