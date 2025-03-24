import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private store = inject(Store<ReadonlyArray<User>>);
  private router = inject(Router);
  email: string = "";
  password: string = "";
  
  // addTask() {
  //   this.store.dispatch(TasksApiActions.createTask({ newTask: this.newTask }));
  //   this.router.navigate(['/tasks']);
  // }

  loginHandler(){
    console.log("login");
    console.log(this.email);
    console.log(this.password)
  }
}
