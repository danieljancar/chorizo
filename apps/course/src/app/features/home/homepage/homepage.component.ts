import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
