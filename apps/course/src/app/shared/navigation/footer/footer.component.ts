import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
  public readonly chorizoGithub = AppComponent.chorizo.links.github;
}
