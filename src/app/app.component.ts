import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { selectIsLoggedIn } from './state/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.model';
import { UsersActions } from './state/actions/user.actions';

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
  private store = inject(Store<User>);
  private router = inject(Router);
  isSignedIn: Observable<boolean>;

  constructor() {
    this.isSignedIn = this.store.select(selectIsLoggedIn);
  }

  logOut() {
    this.store.dispatch(UsersActions.logout());    
    this.router.navigate(['/']);
  }
}
