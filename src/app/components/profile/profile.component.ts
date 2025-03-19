import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    dob: 'January 1, 1990',
    imageUrl: '../assets/profile.png', // Path to your image
  };
}
