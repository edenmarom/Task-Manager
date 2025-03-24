import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksApiActions } from './state/actions/tasks.actions';
import { Task } from './interfaces/task.model';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private store = inject(Store<ReadonlyArray<Task>>);
  isSignedIn: boolean = true; // Example: Set based on user login status
  // TODO: visibility hidden and display none

  constructor() {
    // Example: Check if user is signed in (replace with actual logic)
    // this.isSignedIn = this.authService.isAuthenticated();
    //check!
  }

  ngOnInit(): void {
    this.store.dispatch(TasksApiActions.loadTasks());
  }
}
