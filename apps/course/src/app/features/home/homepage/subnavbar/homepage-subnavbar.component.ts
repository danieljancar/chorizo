import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-homepage-subnavbar',
  standalone: true,
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './homepage-subnavbar.component.html',
  styleUrl: './homepage-subnavbar.component.scss',
})
export class HomepageSubnavbarComponent {
  title: string = environment.metaConfig.title;
}
