import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user.model';
import { UsersApiActions } from '../../state/actions/user.actions';
import { selectProfileData } from '../../state/selectors/user.selectors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
//@ts-ignore
import imgGen from '@dudadev/random-img';
import { TaskManagerState } from '../../state/reducers/task-manager-state';

interface EditProfileForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  dob: FormControl<string | null>;
  imgUrl: FormControl<string | null>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProfileComponent implements OnInit {
  private store = inject(Store<TaskManagerState>);
  private fb = inject(FormBuilder);
  profile$ = this.store.select(selectProfileData);
  profile: User | null = null;
  isEditModalOpen = false;
  editProfileForm!: FormGroup<EditProfileForm>;
  avatarUrl = '';

  ngOnInit() {
    this.store.dispatch(UsersApiActions.getUserData());
    this.profile$.subscribe((data: any) => (this.profile = data));
    imgGen().then((url: string) => (this.avatarUrl = url));
  }

  get email() {
    return this.editProfileForm.get('email');
  }

  get phone() {
    return this.editProfileForm.get('phone');
  }

  get dob() {
    return this.editProfileForm.get('dob');
  }

  openEditModal(profile: User) {
    this.editProfileForm = this.fb.group({
      name: profile.name,
      email: [profile.email, [Validators.required, Validators.email]],
      phone: [
        profile.phone,
        [
          Validators.pattern('^[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      dob: profile.dob,
      imgUrl: profile.imgUrl,
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveEditedProfile() {
    if (this.editProfileForm.valid && this.profile) {
      const changes: Partial<User> = Object.entries(this.editProfileForm.value)
        .filter(
          ([key, value]) =>
            value !== undefined && value !== this.profile![key as keyof User]
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      if (Object.keys(changes).length) {
        this.store.dispatch(
          UsersApiActions.updateUser({ updatedUser: changes })
        );
        this.closeEditModal();
      }
    }
  }
}
