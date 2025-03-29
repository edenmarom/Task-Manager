import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskManagerState } from '../../state/reducers/task-manager-state';
import { selectProfileData } from '../../state/selectors/user.selectors';
import { User } from '../../interfaces/user.model';
import { UsersApiActions } from '../../state/actions/user.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [CommonModule, FormsModule],
})
export class ProfileComponent {
  private store = inject(Store<TaskManagerState>);
  profile$ = this.store.select(selectProfileData);
  profile: User | null = null;
  isEditModalOpen: boolean = false;
  editableProfile: User = {
    name: '',
    email: '',
    phone: '',
    dob: '',
    imgUrl: '',
  };

  ngOnInit() {
    this.store.dispatch(UsersApiActions.getUserData());
    this.profile$.subscribe((data) => {
      this.profile = data;
    });
  }

  openEditModal(profile: User) {
    this.editableProfile = { ...profile };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveEditedProfile() {
    if (this.profile){
      const changes: Partial<User> = {};
      if (this.editableProfile.name !== this.profile.name) {
        changes.name = this.editableProfile.name;
      }
      if (this.editableProfile.email !== this.profile.email) {
        changes.email = this.editableProfile.email;
      }
      if (this.editableProfile.phone !== this.profile.phone) {
        changes.phone = this.editableProfile.phone;
      }
      if (this.editableProfile.dob !== this.profile.dob) {
        changes.dob = this.editableProfile.dob;
      }
      if (this.editableProfile.imgUrl !== this.profile.imgUrl) {
        changes.imgUrl = this.editableProfile.imgUrl;
      }

      if (Object.keys(changes).length > 0) {
        console.log('Updating with changed fields:', changes);
        console.log(this.profile);
        this.store.dispatch(
          UsersApiActions.updateUser({ updatedUser: changes })
        );
        this.closeEditModal();
      }
  }
  }
}

