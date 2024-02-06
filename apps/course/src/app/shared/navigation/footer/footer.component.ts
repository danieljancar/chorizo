import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  chorizoGithub = AppComponent.chorizo.links.github;
}
