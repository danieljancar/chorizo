import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatChip],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course';
}
