import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navigation/navbar/navbar.component';
import { FooterComponent } from '../../../shared/navigation/footer/footer.component';
import { HomepageMarkdownRendererComponent } from './markdown-renderer/homepage-markdown-renderer.component';
import { HomepageSubnavbarComponent } from './subnavbar/homepage-subnavbar.component';
import { HomepageAboutComponent } from './markdown-renderer/about/homepage-about.component';
import { HomepageLatestCoursesComponent } from './latest-courses/homepage-latest-courses.component';

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
export class HomepageComponent {}
