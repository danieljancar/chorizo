import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navigation/navbar/navbar.component';
import { FooterComponent } from '../../../shared/navigation/footer/footer.component';
import { HomepageMarkdownRendererComponent } from './markdown-renderer/homepage-markdown-renderer.component';
import { HomepageSubnavbarComponent } from './subnavbar/homepage-subnavbar.component';
import { HomepageAboutComponent } from './markdown-renderer/about/homepage-about.component';
import { HomepageLatestCoursesComponent } from './latest-courses/homepage-latest-courses.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    HomepageMarkdownRendererComponent,
    HomepageSubnavbarComponent,
    HomepageAboutComponent,
    HomepageLatestCoursesComponent,
    FooterComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  constructor(private title: Title) {
    this.title.setTitle(
      'Home - ' +
        environment.metaConfig.title +
        ' - ' +
        AppComponent.chorizo.title,
    );
  }
}
