import { Component, Input } from '@angular/core';
import { HousingLocation } from '../../interfaces/housing-location';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <!-- <a class="button" routerLink="/details">Learn more</a> -->
      <a class="button" [routerLink]="['/details', housingLocation.id]"
        >Learn more</a
      >
    </section>
    <!-- <router-outlet></router-outlet> -->
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
